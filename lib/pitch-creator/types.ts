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

export interface VignetteItem {
  id: string;
  trigger: string;
  outcome: string;
}

export interface EmployeeVignettes {
  title?: string;
  items: VignetteItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isCustom?: boolean;
}

export interface EmployerFAQs {
  title?: string;
  items: FAQItem[];
}

export interface PitchData {
  brand: BrandConfig;
  offerIntro: OfferIntro;
  teamBenefits: TeamBenefits;
  howItWorks: HowItWorks;
  whyEmployers: WhyEmployers;
  vignettes?: EmployeeVignettes;
  faqs?: EmployerFAQs;
  contact: ContactInfo;
}

export type ViewMode = 'split' | 'editor' | 'preview';
