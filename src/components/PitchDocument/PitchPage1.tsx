import React from 'react';
import { PitchData } from '../../types/pitch';

interface PitchPage1Props {
  data: PitchData;
}

export const PitchPage1: React.FC<PitchPage1Props> = ({ data }) => {
  const { brand, offerIntro, teamBenefits, howItWorks, whyEmployers } = data;

  // Format Why Employers paragraph with bold pink leads
  const renderWhyEmployers = (text: string) => {
    if (!text) return null;
    const paragraphs = text.split(/\n\s*\n/);
    return paragraphs.map((para, i) => {
      // Find lead sentence/phrase ended by period or colon
      const periodIdx = para.indexOf('.');
      if (periodIdx > 0 && periodIdx < 45) {
        const lead = para.substring(0, periodIdx + 1);
        const body = para.substring(periodIdx + 1);
        return (
          <div key={i} className="py-2 border-b border-slate-100 last:border-b-0">
            <p className="text-[11.5px] leading-relaxed text-[#374151]">
              <strong className="font-bold text-[#E31B54] mr-1">{lead}</strong>
              {body}
            </p>
          </div>
        );
      }
      return (
        <div key={i} className="py-2 border-b border-slate-100 last:border-b-0">
          <p className="text-[11.5px] leading-relaxed text-[#374151]">{para}</p>
        </div>
      );
    });
  };

  return (
    <div className="document-page flex flex-col justify-between select-none relative overflow-hidden bg-white text-[#111827]">
      {/* Top Red Accent Bar */}
      <div className="w-full h-1 bg-[#E31B54] -mt-1 -mx-1 mb-5" />

      <div className="flex-1 flex flex-col justify-between">
        {/* Header Branding */}
        <div className="mb-4">
          {brand.logoUrl ? (
            <img
              src={brand.logoUrl}
              alt={brand.practiceName}
              className="max-h-12 max-w-[240px] object-contain mb-3"
            />
          ) : (
            <p className="text-base font-bold italic text-[#E31B54] mb-3">
              {brand.practiceName ? `${brand.practiceName}` : '[Your Practice Name / Logo]'}
            </p>
          )}

          {/* Main Headline */}
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Better healthcare for your team.
          </h1>
          <h1 className="text-2xl font-extrabold text-[#E31B54] tracking-tight leading-tight">
            Lower costs for your business.
          </h1>
        </div>

        {/* Section 1: What We Offer Your Employees */}
        <section className="mb-4">
          <h2 className="text-sm font-bold text-[#111827] mb-1">
            What we offer your employees
          </h2>
          <p className="text-[11.5px] leading-relaxed text-[#374151]">
            {offerIntro.body || (
              <span className="text-slate-400 italic">
                We are a direct primary care practice. That means your employees get a dedicated doctor...
              </span>
            )}
          </p>
        </section>

        {/* Section 2: What Your Team Gets */}
        <section className="mb-4">
          <h2 className="text-sm font-bold text-[#111827]">What your team gets</h2>
          <div className="w-7 h-0.5 bg-[#E31B54] my-1 mb-2" />
          <ul className="space-y-1.5 text-[11.5px] text-[#374151]">
            {teamBenefits.items && teamBenefits.items.length > 0 ? (
              teamBenefits.items.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#111827] mt-1.5 mr-2.5 flex-shrink-0" />
                  <span className="leading-snug">{benefit}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic">Add at least 3 benefit items...</li>
            )}
          </ul>
          <p className="text-[10px] italic text-[#E31B54] font-medium mt-2">
            [Add or remove services based on your practice]
          </p>
        </section>

        {/* Section 3: How It Works Table */}
        <section className="mb-4">
          <h2 className="text-sm font-bold text-[#111827]">How it works</h2>
          <div className="w-7 h-0.5 bg-[#E31B54] my-1 mb-2.5" />
          
          <div className="border border-[#FCE4EC] rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#E31B54] text-white font-bold text-[11px]">
                  <th className="py-2 px-3.5 w-[28%] border-r border-[#E83E6F]">Step</th>
                  <th className="py-2 px-3.5 w-[52%] border-r border-[#E83E6F] text-center">What happens</th>
                  <th className="py-2 px-3.5 w-[20%] text-center">Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FCE4EC]">
                {howItWorks.steps && howItWorks.steps.length > 0 ? (
                  howItWorks.steps.map((step, idx) => (
                    <tr key={step.id || idx} className="bg-white hover:bg-slate-50/50">
                      <td className="py-2.5 px-3.5 text-[11px] font-bold text-[#111827] border-r border-[#FCE4EC] align-middle">
                        {step.stepLabel || `Step ${idx + 1}`}
                      </td>
                      <td className="py-2.5 px-3.5 text-[10.5px] text-[#374151] border-r border-[#FCE4EC] align-middle text-center leading-normal">
                        {step.whatHappens}
                      </td>
                      <td className="py-2.5 px-3.5 text-[10.5px] text-[#374151] align-middle text-center font-medium">
                        {step.timeline || '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-3 px-3 text-center text-slate-400 italic text-xs">
                      No steps configured.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Why Employers Work With Us */}
        <section className="mb-2">
          <h2 className="text-sm font-bold text-[#111827]">{whyEmployers.title || 'Why employers work with us'}</h2>
          <div className="w-7 h-0.5 bg-[#E31B54] my-1 mb-1" />
          <div>{renderWhyEmployers(whyEmployers.subtext)}</div>
        </section>
      </div>

      {/* Decorative Bottom Curved Gradient Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#FCE4EC]/60 via-[#FFE0EC]/80 to-[#FCE4EC]/60 pointer-events-none rounded-t-full opacity-70" />
    </div>
  );
};
