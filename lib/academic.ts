const ORCID_ID = "0000-0003-2339-3321";
const SCOPUS_AUTHOR_ID = "57218373467";
const EXCLUDED_DOIS = [
  "https://doi.org/10.1017/cbo9780511617652",
  "https://doi.org/10.1055/s-0028-1097918",
];
const EXCLUDED_FILTER = EXCLUDED_DOIS.map((d) => `doi:!${d}`).join(",");
const API_KEY = process.env.OPENALEX_API_KEY || "";
const SCOPUS_API_KEY = process.env.SCOPUS_API_KEY || "";
const SCOPUS_PAGE_SIZE = 25;
const SCOPUS_MAX_RETRIES = 3;
const SCOPUS_RETRY_BASE_MS = 1000;
const SCOPUS_REQUEST_DELAY_MS = 350;
const SCOPUS_RESULT_WINDOW = 5000;

// Last verified from the Scopus API on 2026-10-29:
// 377 documents, 10,668 citations, h-index 54.
const SCOPUS_FALLBACK = {
  hIndex: 54,
  citedByCount: 10668,
  worksCount: 377,
} as const;

interface ScopusStats {
  documentCount: number;
  totalCitations: number;
  hIndex: number;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

async function getScopusStats(): Promise<ScopusStats | null> {
  if (!SCOPUS_API_KEY) return null;

  try {
    const firstPage = await fetchScopusPage(0);
    const total = firstPage.total;
    if (!total) return null;

    if (total > SCOPUS_RESULT_WINDOW) {
      throw new Error(
        `Scopus profile has ${total} documents, which exceeds the API result window (${SCOPUS_RESULT_WINDOW})`
      );
    }

    const documents = new Map<string, any>();
    const addEntries = (entries: any[]) => {
      for (const entry of entries) {
        const key =
          entry?.eid ||
          entry?.["dc:identifier"] ||
          `entry-${documents.size}`;
        if (!documents.has(key)) documents.set(key, entry);
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

    const citations = Array.from(documents.values()).map((entry) =>
      parseInt(entry["citedby-count"] || "0", 10)
    );

    return {
      documentCount: total,
      totalCitations: citations.reduce((sum, count) => sum + count, 0),
      hIndex: calculateHIndex(citations),
    };
  } catch (error) {
    console.error("Error in getScopusStats:", error);
    return null;
  }
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

export interface Publication {
  id: string;
  title: string;
  year: number;
  citedByCount: number;
  doi: string | null;
  journal: string | null;
  authors: string;
}

function mapOpenAlexWork(w: any): Publication {
  return {
    id: w.id,
    title: w.title,
    year: w.publication_year,
    citedByCount: w.cited_by_count,
    doi: w.doi ? w.doi.replace("https://doi.org/", "") : null,
    journal: w.primary_location?.source?.display_name || null,
    authors: (w.authorships || []).slice(0, 5).map((a: any) => a.author.display_name).join(", "),
  };
}

export async function getAllPublicationsGrouped(): Promise<{
  years: number[];
  grouped: Record<number, Publication[]>;
  topCited: Publication[];
}> {
  const perPage = 200;
  const baseFilter = `author.orcid:${ORCID_ID},${EXCLUDED_FILTER}`;
  const baseUrl = `https://api.openalex.org/works?filter=${baseFilter}&sort=publication_year:desc&per_page=${perPage}&api_key=${API_KEY}`;
  const fetchOpts = { next: { revalidate: 86400 } };

  try {
    const firstRes = await fetch(`${baseUrl}&page=1`, fetchOpts);
    if (!firstRes.ok) throw new Error("OpenAlex API returned " + firstRes.status);
    const firstData = await firstRes.json();
    const total: number = firstData.meta.count;
    const totalPages = Math.ceil(total / perPage);

    const pagePromises = [];
    for (let i = 2; i <= totalPages; i++) {
      pagePromises.push(fetch(`${baseUrl}&page=${i}`, fetchOpts).then(r => r.json()));
    }
    const restPages = await Promise.all(pagePromises);

    const allResults = [...firstData.results];
    for (const page of restPages) {
      allResults.push(...page.results);
    }

    const publications = allResults.map(mapOpenAlexWork);

    const grouped: Record<number, Publication[]> = {};
    for (const pub of publications) {
      if (!grouped[pub.year]) grouped[pub.year] = [];
      grouped[pub.year].push(pub);
    }

    const years = Object.keys(grouped).map(Number).sort((a, b) => b - a);
    const topCited = [...publications].sort((a, b) => b.citedByCount - a.citedByCount).slice(0, 10);

    return { years, grouped, topCited };
  } catch (error) {
    console.error("Error in getAllPublicationsGrouped:", error);
    return { years: [], grouped: {}, topCited: [] };
  }
}

export async function getPublications(type: 'cited' | 'recent', limit: number = 5) {
  const sortParam = type === 'cited'
    ? "cited_by_count:desc"
    : "publication_year:desc,publication_date:desc";

  const url = `https://api.openalex.org/works?filter=author.orcid:${ORCID_ID},${EXCLUDED_FILTER}&sort=${sortParam}&per_page=${limit}&api_key=${API_KEY}`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${type} publications:`, error);
    return [];
  }
}

export function formatCitationCount(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
}
