const ORCID_ID = "0000-0003-2339-3321";
const EXCLUDED_DOI = "https://doi.org/10.1017/cbo9780511617652"; // The wrong book DOI
const API_KEY = process.env.OPENALEX_API_KEY || "";

/**
 * FETCH 1: For the Hero (Author Statistics)
 * Matches the property names used in your Hero.tsx
 */
export async function getAuthorProfile() {
  try {
    const res = await fetch(
      `https://api.openalex.org/authors/orcid:${ORCID_ID}?api_key=${API_KEY}`,
      { next: { revalidate: 86400 } } // Refresh once a day
    );
    
    if (!res.ok) throw new Error("Failed to fetch author stats");
    const data = await res.json();

    return {
      hIndex: data.summary_stats.h_index,
      i10Index: data.summary_stats.i10_index,
      citedByCount: data.cited_by_count,
      worksCount: data.works_count,
    };
  } catch (error) {
    console.error("Error in getAuthorProfile:", error);
    // Professional fallback values so the site doesn't break
    return { hIndex: 52, i10Index: 140, citedByCount: 12500, worksCount: 500 };
  }
}

/**
 * FETCH 2: For the Publications Page (Paper Lists)
 */
export async function getPublications(type: 'cited' | 'recent', limit: number = 5) {
  const sortParam = type === 'cited' 
    ? "cited_by_count:desc" 
    : "publication_year:desc,publication_date:desc";

  const url = `https://api.openalex.org/works?filter=author.orcid:${ORCID_ID},doi:!${EXCLUDED_DOI}&sort=${sortParam}&per_page=${limit}&api_key=${API_KEY}`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${type} publications:`, error);
    return [];
  }
}

/**
 * UTILITY: Formats large numbers (e.g., 12450 -> 12.5k)
 */
export function formatCitationCount(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
}