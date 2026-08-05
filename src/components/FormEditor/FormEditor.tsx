import React, { useState } from 'react';
import { PitchData } from '../../types/pitch';
import { HeaderSection } from './HeaderSection';
import { OfferSection } from './OfferSection';
import { BenefitsSection } from './BenefitsSection';
import { ProcessSection } from './ProcessSection';
import { WhyEmployersSection } from './WhyEmployersSection';
import { VignettesSection } from './VignettesSection';
import { FaqsSection } from './FaqsSection';
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
  Zap,
  MessageSquare,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { cn } from '@/lib/utils';

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
    vignettes: true,
    faqs: true,
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
      id: 'vignettes',
      title: 'Employee Care Scenarios',
      icon: Zap,
      subtitle: 'What happens when employees reach their doctor',
      isValid: Boolean((data.vignettes?.items?.length || 0) > 0),
      component: <VignettesSection data={data} onChange={onChange} errors={errors} />,
    },
    {
      id: 'faqs',
      title: 'Employer FAQs',
      icon: MessageSquare,
      subtitle: 'Questions & answers we hear from employers',
      isValid: Boolean((data.faqs?.items?.length || 0) > 0),
      component: <FaqsSection data={data} onChange={onChange} errors={errors} />,
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
          <Collapsible
            key={section.id}
            open={isOpen}
            onOpenChange={() => toggleSection(section.id)}
            className={cn("transition-all duration-200", isOpen ? "relative z-20" : "z-0")}
          >
            <Card className={cn(
              "border border-[#DFE1E6] bg-white rounded-xl shadow-[0_1px_3px_rgba(9,30,66,0.06)] hover:shadow-[0_4px_12px_rgba(9,30,66,0.08)] transition-all duration-200",
              isOpen ? "overflow-visible" : "overflow-hidden"
            )}>
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F4F5F7]/80 transition-colors group"
                >
                  <div className="flex items-center space-x-3.5">
                    <Icon className="w-5.5 h-5.5 text-primary shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <h3 className="text-sm font-semibold text-[#172B4D] flex items-center space-x-2">
                        <span>{section.title}</span>
                        {section.isValid ? (
                          <span className="bg-[#E3FCEF] text-[#006644] border border-[#ABF5D1] px-2 py-0.5 text-[10px] rounded-full font-semibold inline-flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3 text-[#006644]" />
                            <span>Complete</span>
                          </span>
                        ) : (
                          <span className="bg-[#FFFAE6] text-[#FF8B00] border border-[#FFE380] px-2 py-0.5 text-[10px] rounded-full font-semibold inline-flex items-center">
                            <span>Pending</span>
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-[#6B778C] font-normal mt-0.5">{section.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-[#6B778C]">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ease-spring ${isOpen ? 'rotate-180 text-[#172B4D]' : ''}`} />
                  </div>
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="p-4 sm:p-5 border-t border-[#DFE1E6]/70 bg-[#FAFBFC] rounded-b-xl">
                  {section.component}
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        );
      })}
    </div>
  );
};
