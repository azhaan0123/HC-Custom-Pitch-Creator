export interface BrandConfig {
  practiceName: string;
  logoUrl?: string;
  accentColor?: string;
}

export interface OfferIntro {
  body: string;
}

export interface TeamBenefits {
  items: string[];
}

export interface ProcessStep {
  id: string;
  stepLabel: string;
  whatHappens: string;
  timeline: string;
}

export interface HowItWorks {
  steps: ProcessStep[];
}

export interface WhyEmployers {
  title: string;
  subtext: string;
}

export interface ContactInfo {
  nameTitle: string;
  practiceName: string;
  phone: string;
  email: string;
  address: string;
  contractTerms: string;
  websiteUrl: string;
  qrCodeUrl?: string;
  qrColorMode?: 'black' | 'accent' | 'custom';
  qrCustomColor?: string;
}

export interface PitchData {
  brand: BrandConfig;
  offerIntro: OfferIntro;
  teamBenefits: TeamBenefits;
  howItWorks: HowItWorks;
  whyEmployers: WhyEmployers;
  contact: ContactInfo;
}

export type ViewMode = 'split' | 'editor' | 'preview';
