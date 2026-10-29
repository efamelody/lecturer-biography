import { fetchOrcidWorks, ORCID_ID, type OrcidRawWork } from "./academic/orcid";

const SCOPUS_AUTHOR_ID = "57218373467";
const EXCLUDED_DOIS = [
  "https://doi.org/10.1017/cbo9780511617652",
  "https://doi.org/10.1055/s-0028-1097918",
];
const API_KEY = process.env.OPENALEX_API_KEY || "";
const SCOPUS_API_KEY = process.env.SCOPUS_API_KEY || "";
const SCOPUS_PAGE_SIZE = 25;
const SCOPUS_MAX_RETRIES = 3;
const SCOPUS_RETRY_BASE_MS = 1000;
const SCOPUS_REQUEST_DELAY_MS = 350;
const SCOPUS_RESULT_WINDOW = 5000;
const OPENALEX_PAGE_SIZE = 100;
const OPENALEX_REQUEST_DELAY_MS = 200;
const MAX_OPENALEX_FALLBACK_REQUESTS = 60;
const OPENALEX_SELECT =
  "id,doi,title,publication_year,cited_by_count,type,primary_location,authorships";
const PROFILE_AUTHOR_NAME = "Mohd Talib Latif";
const PROFILE_OPENALEX_AUTHOR_ID = "https://openalex.org/A5087041770";

// Last verified from the Scopus API on 2026-10-29:
// 377 documents, 10,668 citations, h-index 54.
const SCOPUS_FALLBACK = {
  hIndex: 54,
  citedByCount: 10668,
  worksCount: 377,
} as const;

const SCOPUS_PUBLICATION_SUBTYPES = new Set([
  "Article",
  "Review",
  "Conference Paper",
  "Book Chapter",
  "Data Paper",
  "Letter",
]);

const ORCID_PUBLICATION_TYPES = new Set<string>([
  "journal-article",
  "conference-paper",
  "book-chapter",
  "book",
]);

const OPENALEX_EXCLUDED_TYPES = new Set<string>([
  "conference-abstract",
  "dissertation",
  "editorial",
  "erratum",
  "paratext",
  "peer-review",
  "preprint",
  "retraction",
  "supplementary-materials",
]);

const NON_PUBLICATION_TITLE =
  /^(list of contributors|preface|corrigendum|erratum|retraction note|supplementary material|editorial|book review)\b|supplementary material to|corrigendum to|^(\d{4}:\s*)?the new normal and the air, soil and water research perspective\b|^ten years of air, soil, and water research\b|^a new decade in air, soil and water research\b|^relevance of integrated air, soil and water research studies\b/i;

interface ScopusStats {
  documentCount: number;
  totalCitations: number;
  hIndex: number;
}

interface ScopusDocument {
  id: string;
  title: string;
  year: number;
  doi: string | null;
  journal: string | null;
  citedByCount: number;
  subtype: string;
  creator: string | null;
}

interface ScopusDataset {
  documents: ScopusDocument[];
  total: number;
}

interface PublicationDraft {
  id: string;
  title: string;
  year: number;
  doi: string | null;
  journal: string | null;
  citedByCount: number | null;
  sources: Array<"scopus" | "orcid">;
  creator: string | null;
  openAlex: any | null;
}

export interface PublicationAuthor {
  name: string;
  isProfileAuthor: boolean;
}

export interface Publication {
  id: string;
  title: string;
  year: number;
  citedByCount: number | null;
  doi: string | null;
  journal: string | null;
  authors: string;
  authorList: PublicationAuthor[];
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function cleanTitle(value: string): string {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeTitle(value: string | null | undefined): string {
  return cleanTitle(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeDoi(value: string | null | undefined): string | null {
  if (!value) return null;
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, "")
    .replace(/\/+$/, "");
  return normalized || null;
}

function normalizeOrcid(value: string | null | undefined): string | null {
  if (!value) return null;
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/orcid\.org\//, "")
    .replace(/\/+$/, "");
  return normalized || null;
}

const EXCLUDED_DOI_SET = new Set(
  EXCLUDED_DOIS.map((doi) => normalizeDoi(doi)).filter((doi): doi is string => Boolean(doi))
);

function calculateHIndex(citations: number[]): number {
  const sorted = [...citations].sort((a, b) => b - a);
  let h = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] >= i + 1) h = i + 1;
    else break;
  }
  return h;
}

function normalizeEntries(results: any): any[] {
  const entry = results?.entry;
  if (!entry) return [];
  return Array.isArray(entry) ? entry : [entry];
}

async function waitBeforeRetry(attempt: number) {
  if (attempt < SCOPUS_MAX_RETRIES - 1) {
    await sleep(SCOPUS_RETRY_BASE_MS * 2 ** attempt);
  }
}

async function fetchScopusPage(start: number): Promise<{ entries: any[]; total: number }> {
  const params = new URLSearchParams({
    query: `au-id(${SCOPUS_AUTHOR_ID})`,
    count: String(SCOPUS_PAGE_SIZE),
    start: String(start),
    sort: "citedby-count",
  });
  const url = `https://api.elsevier.com/content/search/scopus?${params.toString()}`;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < SCOPUS_MAX_RETRIES; attempt++) {
    let res: Response;
    try {
      res = await fetch(url, {
        headers: {
          Accept: "application/json",
          "X-ELS-APIKey": SCOPUS_API_KEY,
        },
        next: { revalidate: 86400 },
      });
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Scopus API request failed");
      await waitBeforeRetry(attempt);
      continue;
    }

    if (res.status === 429 || res.status >= 500) {
      lastError = new Error(`Scopus API returned ${res.status}`);
      await waitBeforeRetry(attempt);
      continue;
    }

    if (!res.ok) {
      throw new Error(`Scopus API returned ${res.status}`);
    }

    let data: any;
    try {
      data = await res.json();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Scopus API returned invalid JSON");
      await waitBeforeRetry(attempt);
      continue;
    }

    const results = data?.["search-results"];
    if (!results) {
      lastError = new Error("Scopus API returned an unexpected response");
      await waitBeforeRetry(attempt);
      continue;
    }

    return {
      entries: normalizeEntries(results),
      total: parseInt(results["opensearch:totalResults"] || "0", 10),
    };
  }

  throw lastError ?? new Error("Scopus API request failed");
}

function mapScopusEntry(entry: any): ScopusDocument | null {
  const title = entry?.["dc:title"];
  const year = parseInt((entry?.["prism:coverDate"] || "").slice(0, 4), 10);
  if (!title || !Number.isFinite(year) || year <= 0) return null;

  return {
    id: entry?.eid || entry?.["dc:identifier"] || `${title}-${year}`,
    title: cleanTitle(title),
    year,
    doi: normalizeDoi(entry?.["prism:doi"]),
    journal: entry?.["prism:publicationName"] || null,
    citedByCount: parseInt(entry?.["citedby-count"] || "0", 10),
    subtype: entry?.subtypeDescription || "",
    creator: entry?.["dc:creator"] || null,
  };
}

async function fetchAllScopusDocuments(): Promise<ScopusDataset> {
  const firstPage = await fetchScopusPage(0);
  const total = firstPage.total;
  if (!total) return { documents: [], total: 0 };

  if (total > SCOPUS_RESULT_WINDOW) {
    throw new Error(
      `Scopus profile has ${total} documents, which exceeds the API result window (${SCOPUS_RESULT_WINDOW})`
    );
  }

  const documents = new Map<string, ScopusDocument>();
  const addEntries = (entries: any[]) => {
    for (const entry of entries) {
      const document = mapScopusEntry(entry);
      if (document && !documents.has(document.id)) {
        documents.set(document.id, document);
      }
    }
  };

  if (firstPage.entries.length !== Math.min(SCOPUS_PAGE_SIZE, total)) {
    throw new Error(
      `Scopus returned an incomplete first page: ${firstPage.entries.length}/${Math.min(SCOPUS_PAGE_SIZE, total)} documents`
    );
  }
  addEntries(firstPage.entries);

  for (let start = SCOPUS_PAGE_SIZE; start < total; start += SCOPUS_PAGE_SIZE) {
    await sleep(SCOPUS_REQUEST_DELAY_MS);
    const page = await fetchScopusPage(start);
    const expected = Math.min(SCOPUS_PAGE_SIZE, total - start);
    if (page.entries.length !== expected) {
      throw new Error(
        `Scopus returned an incomplete page at ${start}: ${page.entries.length}/${expected} documents`
      );
    }
    addEntries(page.entries);
  }

  if (documents.size !== total) {
    throw new Error(
      `Scopus pagination incomplete: fetched ${documents.size}/${total} documents`
    );
  }

  return { documents: Array.from(documents.values()), total };
}

let scopusDatasetPromise: Promise<ScopusDataset | null> | null = null;

async function getScopusDataset(): Promise<ScopusDataset | null> {
  if (!SCOPUS_API_KEY) return null;

  if (!scopusDatasetPromise) {
    scopusDatasetPromise = fetchAllScopusDocuments().catch((error) => {
      console.error("Error fetching Scopus documents:", error);
      return null;
    });
  }

  return scopusDatasetPromise;
}

async function getScopusStats(): Promise<ScopusStats | null> {
  const dataset = await getScopusDataset();
  if (!dataset || dataset.documents.length === 0) return null;

  const citations = dataset.documents.map((document) => document.citedByCount);
  return {
    documentCount: dataset.total,
    totalCitations: citations.reduce((sum, count) => sum + count, 0),
    hIndex: calculateHIndex(citations),
  };
}

function isNonPublication(title: string): boolean {
  const cleaned = cleanTitle(title);
  return !cleaned || /^untitled$/i.test(cleaned) || NON_PUBLICATION_TITLE.test(cleaned);
}

function buildPublicationDrafts(
  scopusDocuments: ScopusDocument[],
  orcidWorks: OrcidRawWork[]
): PublicationDraft[] {
  const drafts: PublicationDraft[] = [];
  const byDoi = new Map<string, PublicationDraft>();
  const byTitle = new Map<string, PublicationDraft>();

  const findExisting = (doi: string | null, title: string) => {
    if (doi && byDoi.has(doi)) return byDoi.get(doi);
    const key = normalizeTitle(title);
    if (key && byTitle.has(key)) return byTitle.get(key);
    return undefined;
  };

  const index = (draft: PublicationDraft) => {
    if (draft.doi) byDoi.set(draft.doi, draft);
    const key = normalizeTitle(draft.title);
    if (key) byTitle.set(key, draft);
  };

  const addOrMerge = (draft: PublicationDraft) => {
    const existing = findExisting(draft.doi, draft.title);

    if (!existing) {
      drafts.push(draft);
      index(draft);
      return;
    }

    existing.sources = Array.from(new Set([...existing.sources, ...draft.sources]));
    if (!existing.doi && draft.doi) existing.doi = draft.doi;
    if (!existing.journal && draft.journal) existing.journal = draft.journal;
    if (existing.citedByCount == null && draft.citedByCount != null) {
      existing.citedByCount = draft.citedByCount;
    }
    if (!existing.creator && draft.creator) existing.creator = draft.creator;
    index(existing);
  };

  for (const document of scopusDocuments) {
    if (
      !SCOPUS_PUBLICATION_SUBTYPES.has(document.subtype) ||
      isNonPublication(document.title) ||
      (document.doi && EXCLUDED_DOI_SET.has(document.doi))
    ) {
      continue;
    }

    addOrMerge({
      id: document.id,
      title: document.title,
      year: document.year,
      doi: document.doi,
      journal: document.journal,
      citedByCount: document.citedByCount,
      sources: ["scopus"],
      creator: document.creator,
      openAlex: null,
    });
  }

  for (const work of orcidWorks) {
    if (
      !ORCID_PUBLICATION_TYPES.has(work.type) ||
      isNonPublication(work.title) ||
      work.year <= 0 ||
      (work.doi && EXCLUDED_DOI_SET.has(work.doi))
    ) {
      continue;
    }

    addOrMerge({
      id: `orcid:${work.putCode}`,
      title: cleanTitle(work.title),
      year: work.year,
      doi: work.doi,
      journal: work.journal,
      citedByCount: null,
      sources: ["orcid"],
      creator: null,
      openAlex: null,
    });
  }

  return drafts;
}

function hasOpenAlexKey(): boolean {
  return Boolean(API_KEY);
}

function openAlexHeaders(): Record<string, string> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (hasOpenAlexKey()) headers.Authorization = `Bearer ${API_KEY}`;
  return headers;
}

async function fetchOpenAlexAuthorWorks(): Promise<any[]> {
  const works: any[] = [];
  let page = 1;

  try {
    while (true) {
      const params = new URLSearchParams({
        filter: `author.orcid:${ORCID_ID}`,
        per_page: String(OPENALEX_PAGE_SIZE),
        page: String(page),
        select: OPENALEX_SELECT,
      });

      const res = await fetch(`https://api.openalex.org/works?${params.toString()}`, {
        headers: openAlexHeaders(),
        next: { revalidate: 86400 },
      });
      if (!res.ok) throw new Error(`OpenAlex API returned ${res.status}`);
      const data = await res.json();
      const results = data.results || [];
      works.push(...results);

      if (works.length >= data.meta.count || results.length === 0) break;
      page += 1;
      await sleep(OPENALEX_REQUEST_DELAY_MS);
    }
  } catch (error) {
    console.error("Error fetching OpenAlex author works:", error);
  }

  return works;
}

function indexOpenAlexWorks(works: any[]) {
  const byDoi = new Map<string, any>();
  const byTitle = new Map<string, any>();

  for (const work of works) {
    const doi = normalizeDoi(work.doi);
    if (doi && !byDoi.has(doi)) byDoi.set(doi, work);

    const title = normalizeTitle(work.title);
    if (title && !byTitle.has(title)) byTitle.set(title, work);
  }

  return { byDoi, byTitle };
}

async function fetchOpenAlexWorkByDoi(doi: string): Promise<any | null> {
  const params = new URLSearchParams({
    filter: `doi:${doi}`,
    per_page: "1",
    select: OPENALEX_SELECT,
  });

  try {
    const res = await fetch(`https://api.openalex.org/works?${params.toString()}`, {
      headers: openAlexHeaders(),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.results?.[0] || null;
  } catch (error) {
    console.error("Error fetching OpenAlex work by DOI:", error);
    return null;
  }
}

async function fetchOpenAlexByTitle(title: string): Promise<any | null> {
  const target = normalizeTitle(title);
  if (!target) return null;

  const params = new URLSearchParams({
    search: cleanTitle(title),
    per_page: "5",
    select: OPENALEX_SELECT,
  });

  try {
    const res = await fetch(`https://api.openalex.org/works?${params.toString()}`, {
      headers: openAlexHeaders(),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();

    return (
      (data.results || []).find(
        (work: any) => normalizeTitle(work.title) === target
      ) || null
    );
  } catch (error) {
    console.error("Error matching publication title in OpenAlex:", error);
    return null;
  }
}

async function fetchFullOpenAlexWork(work: any): Promise<any> {
  if (!work?.id || (work.authorships || []).length < 100) return work;

  const id = String(work.id).split("/").pop();
  if (!id) return work;

  const params = new URLSearchParams({ select: OPENALEX_SELECT });

  try {
    const res = await fetch(
      `https://api.openalex.org/works/${id}?${params.toString()}`,
      {
        headers: openAlexHeaders(),
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return work;
    return await res.json();
  } catch (error) {
    console.error("Error fetching full OpenAlex work:", error);
    return work;
  }
}

function isProfileAuthor(authorship: any): boolean {
  const author = authorship?.author;

  if (normalizeOrcid(author?.orcid) === normalizeOrcid(ORCID_ID)) return true;
  if (author?.id === PROFILE_OPENALEX_AUTHOR_ID) return true;

  const name = normalizeTitle(author?.display_name || authorship?.raw_author_name);
  return [
    "mohd talib latif",
    "mohd t latif",
    "m t latif",
    "mt latif",
    "mohd talip latif",
    "mohd talib bin latif",
    "mohd latif",
  ].includes(name);
}

function buildAuthorList(work: any, fallbackCreator: string | null): PublicationAuthor[] {
  const authorships = Array.isArray(work?.authorships) ? work.authorships : [];
  const authors: PublicationAuthor[] = authorships
    .map((authorship: any) => ({
      name: authorship?.author?.display_name || authorship?.raw_author_name || "",
      isProfileAuthor: isProfileAuthor(authorship),
    }))
    .filter((author: PublicationAuthor) => Boolean(author.name));

  if (authors.length === 0) {
    if (fallbackCreator) {
      authors.push({ name: fallbackCreator, isProfileAuthor: false });
    }
    authors.push({ name: PROFILE_AUTHOR_NAME, isProfileAuthor: true });
  } else if (!authors.some((author) => author.isProfileAuthor)) {
    authors.push({ name: PROFILE_AUTHOR_NAME, isProfileAuthor: true });
  }

  return authors;
}

async function enrichDrafts(drafts: PublicationDraft[]): Promise<PublicationDraft[]> {
  const authorWorks = await fetchOpenAlexAuthorWorks();
  const { byDoi, byTitle } = indexOpenAlexWorks(authorWorks);
  let fallbackRequests = 0;

  for (const draft of drafts) {
    let work = draft.doi ? byDoi.get(draft.doi) : undefined;

    if (!work) {
      const titleKey = normalizeTitle(draft.title);
      if (titleKey) work = byTitle.get(titleKey);
    }

    if (!work && fallbackRequests < MAX_OPENALEX_FALLBACK_REQUESTS) {
      fallbackRequests += 1;

      if (draft.doi) {
        work = (await fetchOpenAlexWorkByDoi(draft.doi)) || undefined;
      } else {
        const titleKey = normalizeTitle(draft.title);
        const match = await fetchOpenAlexByTitle(draft.title);
        if (match && titleKey) byTitle.set(titleKey, match);
        work = match || undefined;
      }

      await sleep(OPENALEX_REQUEST_DELAY_MS);
    }

    if (work) {
      draft.openAlex = await fetchFullOpenAlexWork(work);
    }
  }

  return drafts.filter((draft) => {
    const type = draft.openAlex?.type;
    return !type || !OPENALEX_EXCLUDED_TYPES.has(type);
  });
}

function toPublication(draft: PublicationDraft): Publication {
  const work = draft.openAlex;
  const authorList = buildAuthorList(work, draft.creator);
  const title = cleanTitle(draft.title || work?.title || "");

  return {
    id: draft.id,
    title: title || "Untitled",
    year: draft.year || work?.publication_year || 0,
    citedByCount:
      draft.citedByCount ??
      (typeof work?.cited_by_count === "number" ? work.cited_by_count : null),
    doi: draft.doi || normalizeDoi(work?.doi),
    journal:
      draft.journal ||
      work?.primary_location?.source?.display_name ||
      null,
    authors: authorList
      .slice(0, 5)
      .map((author) => author.name)
      .join(", "),
    authorList,
  };
}

export async function getAuthorProfile() {
  const scopusStats = await getScopusStats();

  if (scopusStats) {
    return {
      hIndex: scopusStats.hIndex,
      citedByCount: scopusStats.totalCitations,
      worksCount: scopusStats.documentCount,
      source: "scopus-live" as const,
    };
  }

  console.warn("Using the last verified Scopus snapshot for author metrics");
  return {
    ...SCOPUS_FALLBACK,
    source: "scopus-snapshot" as const,
  };
}

export async function getAllPublicationsGrouped(): Promise<{
  years: number[];
  grouped: Record<number, Publication[]>;
  topCited: Publication[];
}> {
  try {
    const [scopusDataset, orcidResult] = await Promise.all([
      getScopusDataset(),
      fetchOrcidWorks(),
    ]);

    const scopusDocuments = scopusDataset?.documents || [];
    const orcidWorks = orcidResult.works || [];

    if (scopusDocuments.length === 0 && orcidWorks.length === 0) {
      return { years: [], grouped: {}, topCited: [] };
    }

    const drafts = buildPublicationDrafts(scopusDocuments, orcidWorks);
    const enriched = await enrichDrafts(drafts);
    const publications = enriched
      .filter((draft) => draft.year > 0)
      .map(toPublication);

    const grouped: Record<number, Publication[]> = {};
    for (const publication of publications) {
      if (!grouped[publication.year]) grouped[publication.year] = [];
      grouped[publication.year].push(publication);
    }

    for (const year of Object.keys(grouped)) {
      grouped[Number(year)].sort(
        (a, b) => (b.citedByCount ?? -1) - (a.citedByCount ?? -1)
      );
    }

    const years = Object.keys(grouped)
      .map(Number)
      .sort((a, b) => b - a);
    const topCited = [...publications]
      .sort((a, b) => (b.citedByCount ?? -1) - (a.citedByCount ?? -1))
      .slice(0, 10);

    return { years, grouped, topCited };
  } catch (error) {
    console.error("Error in getAllPublicationsGrouped:", error);
    return { years: [], grouped: {}, topCited: [] };
  }
}

export function formatCitationCount(count: number | null): string {
  if (count == null) return "—";
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count.toString();
}
