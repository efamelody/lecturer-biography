export type PublicationType =
  | 'journal-article'
  | 'conference-paper'
  | 'book-chapter'
  | 'book'
  | 'preprint'
  | 'other';

export interface Publication {
  id: string;
  title: string;
  year: number;
  citedByCount: number | null;
  doi: string | null;
  journal: string | null;
  authors: string;
  type: PublicationType;
  url: string | null;
  source: 'orcid' | 'openalex';
  isCurated: boolean;
}

export interface MetricsSnapshot {
  hIndex: number;
  i10Index: number;
  citedByCount: number;
  worksCount: number;
  curatedWorksCount: number;
  lastModifiedDate: string | null;
  sourceLabel: string;
}

export interface GroupedPublications {
  years: number[];
  grouped: Record<number, Publication[]>;
  topCited: Publication[];
  rawCount: number;
  curatedCount: number;
}
