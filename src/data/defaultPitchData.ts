import { PitchData } from '../types/pitch';

export const defaultPitchData: PitchData = {
  brand: {
    practiceName: 'Example Direct Primary Care',
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
  vignettes: {
    title: 'What happens when your employees can actually reach their doctor.',
    items: [
      {
        id: 'v1',
        trigger: 'An employee texts at 8am with back pain.',
        outcome: 'Seen by 10am. No half-day off work. No urgent care bill.',
      },
      {
        id: 'v2',
        trigger: "An employee's child spikes a fever at night.",
        outcome: 'They call our nurse line. Handled over the phone. No ER visit.',
      },
      {
        id: 'v3',
        trigger: 'An employee managing diabetes gets monthly check-ins.',
        outcome: 'A1C improves over time. Fewer sick days. Fewer complications down the road.',
      },
      {
        id: 'v4',
        trigger: 'An employee needs stitches at work.',
        outcome: 'Comes to us directly. Taken care of the same day. No insurance claim filed.',
      },
    ],
  },
  faqs: {
    title: 'Questions we hear from employers.',
    items: [
      {
        id: 'faq-1',
        question: 'Does this replace our insurance?',
        answer: 'No. We cover primary care. Your employees keep their insurance for everything else. Most employers we work with pair this with a high-deductible plan, which brings their premiums down.',
      },
      {
        id: 'faq-2',
        question: 'What if our employees already have a doctor they like?',
        answer: 'That is completely fine. We work alongside their existing care. No one is required to switch. What we find is that most employees start using us for the convenience and the access, and it becomes their preferred first call over time.',
      },
      {
        id: 'faq-3',
        question: 'How will we know it is working?',
        answer: 'We share quarterly reports with you covering engagement, utilization, cost savings, and health outcomes. You will always have full visibility into what your employees are getting and what value is being delivered.',
      },
      {
        id: 'faq-4',
        question: 'What does this cost us?',
        answer: 'We will walk you through the pricing when we meet. It depends on your team size and what you need. What we can tell you now is that for most employers, the membership cost is a fraction of what a single ER visit costs per employee.',
      },
    ],
  },
  contact: {
    nameTitle: 'Jane Doe, MD — Founder & Medical Director',
    practiceName: 'Example Direct Primary Care',
    phone: '(555) 000-0000',
    email: 'care@exampledpc.com',
    address: '100 Medical Center Pkwy, Suite 100, City, ST 00000',
    contractTerms: '12-month agreement with a 60-day cancellation clause',
    websiteUrl: 'https://www.exampledpc.com',
    qrColorMode: 'black',
    qrCustomColor: '#ef9493',
  },
};

export const samplePresets: Record<string, PitchData> = {
  default: defaultPitchData,
  metro: {
    brand: {
      practiceName: 'Example DPC',
      logoUrl: '',
    },
    offerIntro: {
      body: 'Example DPC provides high-touch, priority healthcare directly to your staff. Eliminate standard medical friction with direct physician access and 24/7 telehealth.',
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
      title: 'Why leading companies partner with Example DPC',
      subtext: `Drastically Reduced Absenteeism. Virtual-first primary care resolves over 85% of routine concerns in under 15 minutes, keeping employees focused and supported.

Substantial Premium Savings. Pairing Example DPC with high-deductible plans reduces total health plan expense by 20–35% annually.

Employee Retention Advantage. A dedicated doctor is ranked as a top 3 valued perk by modern workforce surveys.`,
    },
    contact: {
      nameTitle: 'Jane Doe — Director of Employer Partnerships',
      practiceName: 'Example DPC',
      phone: '(800) 555-0000',
      email: 'partnerships@exampledpc.com',
      address: '500 Technology Square, Suite 400, City, ST 00000',
      contractTerms: 'Flexible month-to-month membership with 30-day notice',
      websiteUrl: 'https://www.exampledpc.com',
    },
  },
};
