import type { PublicationType } from './types';

export const ORCID_ID = "0000-0003-2339-3321";

export interface OrcidRawWork {
  putCode: string;
  title: string;
  year: number;
  type: PublicationType;
  journal: string | null;
  doi: string | null;
  url: string | null;
}

export interface OrcidFetchResult {
  works: OrcidRawWork[];
  lastModifiedDate: string | null;
}

function mapOrcidType(rawType: string): PublicationType {
  const normalized = (rawType || '').toLowerCase();
  if (normalized.includes('journal-article') || normalized.includes('article')) return 'journal-article';
  if (normalized.includes('conference')) return 'conference-paper';
  if (normalized.includes('chapter')) return 'book-chapter';
  if (normalized.includes('book')) return 'book';
  if (normalized.includes('preprint')) return 'preprint';
  return 'other';
}

export async function fetchOrcidWorks(): Promise<OrcidFetchResult> {
  const url = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;
  const fetchOpts = {
    headers: { Accept: "application/json" },
    next: { revalidate: 86400 },
  };

  try {
    const res = await fetch(url, fetchOpts);
    if (!res.ok) {
      throw new Error(`ORCID API returned status ${res.status}`);
    }

    const data = await res.json();
    const groups = data.group || [];
    const works: OrcidRawWork[] = [];

    let lastModifiedDate: string | null = null;
    if (data['last-modified-date']?.value) {
      const ts = data['last-modified-date'].value;
      const d = new Date(ts);
      if (!isNaN(d.getTime())) {
        lastModifiedDate = d.toISOString().split('T')[0];
      }
    }

    for (const g of groups) {
      const ss = g['work-summary'] || [];
      if (ss.length === 0) continue;

      const w0 = ss[0];
      const title = w0.title?.title?.value || 'Untitled';
      const year = parseInt(w0['publication-date']?.year?.value || '0', 10) || 2020;
      const type = mapOrcidType(w0.type || '');
      const journal = w0['journal-title']?.value || null;

      let doi: string | null = null;
      let url: string | null = w0.url?.value || null;

      for (const s of ss) {
        const eids = s['external-ids']?.['external-id'] || [];
        for (const eid of eids) {
          const idType = (eid['external-id-type'] || '').toLowerCase();
          const idVal = String(eid['external-id-value'] || '').trim();

          if (idType === 'doi' && !doi && idVal) {
            doi = idVal.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').toLowerCase();
          }
          if (idType === 'url' && !url && idVal) {
            url = idVal;
          }
        }
      }

      works.push({
        putCode: String(g['work-summary']?.[0]?.['put-code'] || Math.random()),
        title,
        year,
        type,
        journal,
        doi,
        url,
      });
    }

    return { works, lastModifiedDate };
  } catch (error) {
    console.error("Error fetching ORCID works:", error);
    return { works: [], lastModifiedDate: null };
  }
}
