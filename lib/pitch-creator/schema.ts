import { z } from 'zod';

export const processStepSchema = z.object({
  id: z.string(),
  stepLabel: z.string().min(1, 'Step title is required').max(80, 'Step title must be under 80 characters'),
  whatHappens: z.string().min(1, 'Description is required').max(250, 'Description must be under 250 characters'),
  timeline: z.string().default(''),
});

export const vignetteItemSchema = z.object({
  id: z.string(),
  trigger: z.string().min(1, 'Trigger scenario is required'),
  outcome: z.string().min(1, 'Outcome description is required'),
});

export const faqItemSchema = z.object({
  id: z.string(),
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  isCustom: z.boolean().optional(),
});

export const pitchSchema = z.object({
  brand: z.object({
    practiceName: z.string().min(1, 'Practice name is required').max(60, 'Practice name must be 60 characters or less'),
    logoUrl: z.string().optional(),
    accentColor: z.string().optional(),
  }),
  offerIntro: z.object({
    body: z.string().min(10, 'Offer intro must be at least 10 characters'),
  }),
  teamBenefits: z.object({
    items: z.array(z.string().min(1, 'Benefit item cannot be empty'))
      .min(3, 'Minimum 3 benefit items required')
      .max(8, 'Maximum 8 benefit items allowed'),
  }),
  howItWorks: z.object({
    steps: z.array(processStepSchema)
      .min(3, 'Minimum 3 process steps required')
      .max(6, 'Maximum 6 process steps allowed'),
  }),
  whyEmployers: z.object({
    title: z.string().max(60, 'Title must be 60 characters or less').default('Why employers work with us'),
    subtext: z.string().min(10, 'Subtext must be at least 10 characters'),
  }),
  vignettes: z.object({
    title: z.string().optional(),
    items: z.array(vignetteItemSchema).optional().default([]),
  }).optional(),
  faqs: z.object({
    title: z.string().optional(),
    items: z.array(faqItemSchema).optional().default([]),
  }).optional(),
  contact: z.object({
    nameTitle: z.string().min(1, 'Name and Title are required'),
    practiceName: z.string().min(1, 'Practice Name is required'),
    phone: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email address').or(z.string().min(1, 'Email is required')),
    address: z.string().min(1, 'Address is required'),
    contractTerms: z.string().min(1, 'Contract terms are required'),
    websiteUrl: z.string().optional(),
    qrCodeUrl: z.string().optional(),
    qrColorMode: z.enum(['black', 'accent', 'custom']).optional(),
    qrCustomColor: z.string().optional(),
  }),
});

export type PitchSchemaType = z.infer<typeof pitchSchema>;
