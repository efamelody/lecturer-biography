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

async function getScopusStats(): Promise<{ documentCount: number; totalCitations: number; hIndex: number } | null> {
  if (!SCOPUS_API_KEY) return null;
  try {
    const baseUrl = `https://api.elsevier.com/content/search/scopus?query=au-id(${SCOPUS_AUTHOR_ID})&apiKey=${SCOPUS_API_KEY}`;
    const fetchOpts = {
      headers: { Accept: "application/json" as const },
      next: { revalidate: 86400 },
    };

    const firstRes = await fetch(`${baseUrl}&count=${SCOPUS_PAGE_SIZE}&start=0`, fetchOpts);
    if (!firstRes.ok) throw new Error("Scopus API returned " + firstRes.status);
    const firstData = await firstRes.json();
    const total = parseInt(firstData?.["search-results"]?.["opensearch:totalResults"] || "0");
    if (!total) return null;

    const pages = Math.ceil(total / SCOPUS_PAGE_SIZE);
    const pagePromises = [];
    for (let i = 1; i < pages; i++) {
      const url = `${baseUrl}&count=${SCOPUS_PAGE_SIZE}&start=${i * SCOPUS_PAGE_SIZE}`;
      pagePromises.push(fetch(url, fetchOpts).then(r => r.json()));
    }
    const pageData = await Promise.all(pagePromises);

    const allEntries = [...firstData["search-results"]["entry"]];
    for (const pd of pageData) {
      allEntries.push(...(pd?.["search-results"]?.entry || []));
    }

    const cites: number[] = allEntries.map(e => parseInt(e["citedby-count"] || "0", 10));
    cites.sort((a, b) => b - a);

    let h = 0;
    for (let i = 0; i < cites.length; i++) {
      if (cites[i] >= i + 1) h = i + 1;
      else break;
    }

    return {
      documentCount: total,
      totalCitations: cites.reduce((a, b) => a + b, 0),
      hIndex: h,
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
    };
  }

  try {
    const res = await fetch(
      `https://api.openalex.org/authors/orcid:${ORCID_ID}?api_key=${API_KEY}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error("Failed to fetch author stats");
    const data = await res.json();

    return {
      hIndex: data.summary_stats.h_index,
      citedByCount: data.cited_by_count,
      worksCount: data.works_count,
    };
  } catch (error) {
    console.error("Error in getAuthorProfile:", error);
    return { hIndex: 52, citedByCount: 12500, worksCount: 500 };
  }
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
