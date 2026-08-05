import { PitchData } from '../types/pitch';

export const defaultPitchData: PitchData = {
  brand: {
    practiceName: 'Riverside Direct Primary Care',
    logoUrl: '',
    accentColor: '#ef9493',
  },
  offerIntro: {
    body: 'We are a direct primary care practice. That means your employees get a dedicated doctor they can call, text, or visit the same day. No copays. No insurance paperwork. No waiting weeks for an appointment. It is healthcare that works the way it should.',
  },
  teamBenefits: {
    items: [
      'Same-day or next-day appointments, including telehealth',
      'Direct phone and text access to their doctor',
      'No copays for primary care visits',
      'Chronic condition management (diabetes, hypertension, and more)',
      'Routine labs and basic procedures included',
      'After-hours access through a 24/7 nurse line',
    ],
  },
  howItWorks: {
    steps: [
      {
        id: 'step-1',
        stepLabel: '1. We meet',
        whatHappens: 'A quick conversation to understand your team and what you need',
        timeline: '30 minutes',
      },
      {
        id: 'step-2',
        stepLabel: '2. We build a plan',
        whatHappens: 'We put together a membership structure that fits your budget',
        timeline: 'Same week',
      },
      {
        id: 'step-3',
        stepLabel: '3. Your team enrolls',
        whatHappens: 'We come to your workplace and walk employees through everything in person',
        timeline: '1 week',
      },
      {
        id: 'step-4',
        stepLabel: '4. Care starts',
        whatHappens: 'Your employees can call, text, or schedule a visit right away',
        timeline: 'Day 1',
      },
    ],
  },
  whyEmployers: {
    title: 'Why employers work with us',
    subtext: `Your employees get care faster. When someone can call their doctor directly and be seen the same day, they are not sitting in an urgent care waiting room or going to the ER for something that could have been a 10-minute visit.

Your team misses less work. Same-day access and after-hours availability mean fewer half-days off for appointments and fewer sick days for issues that can be handled with a phone call.

Your costs go down over time. Fewer ER visits, fewer specialist referrals, and fewer insurance claims. One avoided ER visit can cover an employee's entire annual membership.

Your people notice. Healthcare that employees actually use and appreciate is a real benefit that helps you attract and keep good people.`,
  },
  contact: {
    nameTitle: 'Dr. Sarah Jenkins, MD — Founder & Medical Director',
    practiceName: 'Riverside Direct Primary Care',
    phone: '(555) 839-2041',
    email: 'care@riversidedirectcare.com',
    address: '104 Health Science Pkwy, Suite 200, Austin, TX 78701',
    contractTerms: '12-month agreement with a 60-day cancellation clause',
    websiteUrl: 'https://www.riversidedirectcare.com',
    qrColorMode: 'black',
    qrCustomColor: '#ef9493',
  },
};

export const samplePresets: Record<string, PitchData> = {
  default: defaultPitchData,
  metro: {
    brand: {
      practiceName: 'Apex Health DPC',
      logoUrl: '',
    },
    offerIntro: {
      body: 'Apex Health provides high-touch, priority healthcare directly to your staff. Eliminate standard medical friction with direct physician access and 24/7 telehealth.',
    },
    teamBenefits: {
      items: [
        'Priority same-day appointment booking for all plan members',
        'Direct encrypted messaging and video calls with assigned primary physician',
        'Zero out-of-pocket costs for all in-clinic procedures and annual physicals',
        'On-site biometric screenings and annual wellness workshops',
        'At-cost prescription meds shipped directly to employee homes',
      ],
    },
    howItWorks: {
      steps: [
        {
          id: 'step-1',
          stepLabel: '1. Discovery & Design',
          whatHappens: 'We assess your current healthcare spend and design a custom employer tier.',
          timeline: '15 mins',
        },
        {
          id: 'step-2',
          stepLabel: '2. Simple Onboarding',
          whatHappens: 'Employees register digitally in under 3 minutes with zero paperwork.',
          timeline: '24 hours',
        },
        {
          id: 'step-3',
          stepLabel: '3. Immediate Access',
          whatHappens: 'Full access to clinical team begins immediately on contract start date.',
          timeline: 'Day 1',
        },
      ],
    },
    whyEmployers: {
      title: 'Why leading companies partner with Apex Health',
      subtext: `Drastically Reduced Absenteeism. Virtual-first primary care resolves over 85% of routine concerns in under 15 minutes, keeping employees focused and supported.

Substantial Premium Savings. Pairing Apex Health with high-deductible plans reduces total health plan expense by 20–35% annually.

Employee Retention Advantage. A dedicated doctor is ranked as a top 3 valued perk by modern workforce surveys.`,
    },
    contact: {
      nameTitle: 'Marcus Vance — Director of Employer Partnerships',
      practiceName: 'Apex Health DPC',
      phone: '(800) 555-0199',
      email: 'partnerships@apexhealthdpc.com',
      address: '500 Technology Square, Suite 400, Chicago, IL 60601',
      contractTerms: 'Flexible month-to-month membership with 30-day notice',
      websiteUrl: 'https://www.apexhealthdpc.com',
    },
  },
};
