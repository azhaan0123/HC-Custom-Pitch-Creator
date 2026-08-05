import React, { useState } from 'react';
import { PitchData } from '../../types/pitch';
import { HeaderSection } from './HeaderSection';
import { OfferSection } from './OfferSection';
import { BenefitsSection } from './BenefitsSection';
import { ProcessSection } from './ProcessSection';
import { WhyEmployersSection } from './WhyEmployersSection';
import { ContactSection } from './ContactSection';
import {
  Building2,
  FileText,
  CheckCircle2,
  ListChecks,
  Table,
  HelpCircle,
  PhoneCall,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface FormEditorProps {
  data: PitchData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const FormEditor: React.FC<FormEditorProps> = ({ data, onChange, errors }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    brand: true,
    offer: true,
    benefits: true,
    process: true,
    why: true,
    contact: true,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sections = [
    {
      id: 'brand',
      title: 'Practice Branding & Header',
      icon: Building2,
      subtitle: 'Practice Name & Logo',
      isValid: Boolean(data.brand.practiceName.trim()),
      component: <HeaderSection data={data} onChange={onChange} errors={errors} />,
    },
    {
      id: 'offer',
      title: 'What We Offer Your Employees',
      icon: FileText,
      subtitle: 'Core pitch intro statement (~500 chars)',
      isValid: Boolean(data.offerIntro.body.trim()),
      component: <OfferSection data={data} onChange={onChange} errors={errors} />,
    },
    {
      id: 'benefits',
      title: 'What Your Team Gets',
      icon: ListChecks,
      subtitle: 'Bulleted list of employee benefits (3–8 items)',
      isValid: data.teamBenefits.items.length >= 3 && data.teamBenefits.items.length <= 8,
      component: <BenefitsSection data={data} onChange={onChange} errors={errors} />,
    },
    {
      id: 'process',
      title: 'How It Works (Process Steps)',
      icon: Table,
      subtitle: '2-column timeline table (3–6 steps)',
      isValid: data.howItWorks.steps.length >= 3 && data.howItWorks.steps.length <= 6,
      component: <ProcessSection data={data} onChange={onChange} errors={errors} />,
    },
    {
      id: 'why',
      title: 'Why Employers Work With Us',
      icon: HelpCircle,
      subtitle: 'Key Employer Value Propositions (~800 chars)',
      isValid: Boolean(data.whyEmployers.subtext.trim()),
      component: <WhyEmployersSection data={data} onChange={onChange} errors={errors} />,
    },
    {
      id: 'contact',
      title: 'Contact Info & Contract Terms',
      icon: PhoneCall,
      subtitle: 'Footer details & FAQ commitment clause',
      isValid: Boolean(
        data.contact.nameTitle.trim() &&
          data.contact.phone.trim() &&
          data.contact.email.trim() &&
          data.contact.contractTerms.trim()
      ),
      component: <ContactSection data={data} onChange={onChange} errors={errors} />,
    },
  ];

  return (
    <div className="space-y-4 pb-12">
      {sections.map((section) => {
        const Icon = section.icon;
        const isOpen = openSections[section.id];

        return (
          <div
            key={section.id}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-850 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-400">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
                    <span>{section.title}</span>
                    {section.isValid && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline-block" />
                    )}
                  </h3>
                  <p className="text-[11px] text-slate-400">{section.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-slate-400">
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {isOpen && (
              <div className="p-4 pt-1 border-t border-slate-800/60 bg-slate-950/40">
                {section.component}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
