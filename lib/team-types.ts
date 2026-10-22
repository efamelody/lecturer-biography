export type TeamCategory = 'staff' | 'postgraduate' | 'alumni';

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  description?: string;
  interests: string[];
  image?: string;
  profileUrl?: string;
  scholarUrl?: string;
  researchTitle?: string;
  researchTopic?: string;
  supervisor?: string;
  degree?: string;
  previousRole?: string;
  previousDegree?: string;
  graduationYear?: string;
}

export interface TeamIntro {
  eyebrow: string;
  heading: string;
  description: string;
}

export interface TeamContact {
  heading: string;
  description: string;
  note?: string;
  email: string;
  addressLines: string[];
}

export interface TeamPageContent {
  intro: TeamIntro;
  leader: TeamMember;
  staff: TeamMember[];
  postgraduates: TeamMember[];
  alumni: TeamMember[];
  contact: TeamContact;
}
