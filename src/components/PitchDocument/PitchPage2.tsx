import React from 'react';
import { PitchData } from '../../types/pitch';

interface PitchPage2Props {
  data: PitchData;
}

export const PitchPage2: React.FC<PitchPage2Props> = ({ data }) => {
  const { contact, brand } = data;

  const vignettes = [
    {
      trigger: 'An employee texts at 8am with back pain.',
      outcome: 'Seen by 10am. No half-day off work. No urgent care bill.',
    },
    {
      trigger: "An employee's child spikes a fever at night.",
      outcome: 'They call our nurse line. Handled over the phone. No ER visit.',
    },
    {
      trigger: 'An employee managing diabetes gets monthly check-ins.',
      outcome: 'A1C improves over time. Fewer sick days. Fewer complications down the road.',
    },
    {
      trigger: 'An employee needs stitches at work.',
      outcome: 'Comes to us directly. Taken care of the same day. No insurance claim filed.',
    },
  ];

  const faqs = [
    {
      q: 'Does this replace our insurance?',
      a: 'No. We cover primary care. Your employees keep their insurance for everything else. Most employers we work with pair this with a high-deductible plan, which brings their premiums down.',
      isCustom: false,
    },
    {
      q: 'What if our employees already have a doctor they like?',
      a: 'That is completely fine. We work alongside their existing care. No one is required to switch. What we find is that most employees start using us for the convenience and the access, and it becomes their preferred first call over time.',
      isCustom: false,
    },
    {
      q: 'How will we know it is working?',
      a: 'We share quarterly reports with you covering engagement, utilization, cost savings, and health outcomes. You will always have full visibility into what your employees are getting and what value is being delivered.',
      isCustom: false,
    },
    {
      q: 'What is the commitment?',
      a: contact.contractTerms
        ? contact.contractTerms
        : '[Insert your contract terms, e.g., 12-month agreement with a 60-day cancellation clause]',
      isCustom: true,
    },
    {
      q: 'What does this cost us?',
      a: 'We will walk you through the pricing when we meet. It depends on your team size and what you need. What we can tell you now is that for most employers, the membership cost is a fraction of what a single ER visit costs per employee.',
      isCustom: false,
    },
  ];

  return (
    <div className="document-page flex flex-col justify-between select-none relative overflow-hidden bg-white text-[#111827]">
      {/* Top Orange Accent Bar */}
      <div className="w-full h-1 bg-[#FF5722] -mt-1 -mx-1 mb-5" />

      <div className="flex-1 flex flex-col justify-between">
        {/* Section 1: What happens when employees can reach their doctor */}
        <section className="mb-4">
          <h1 className="text-xl font-extrabold text-[#111827] tracking-tight leading-snug mb-3">
            What happens when your employees<br />can actually reach their doctor.
          </h1>

          <div className="space-y-3 pl-1">
            {vignettes.map((v, idx) => (
              <div key={idx} className="border-l-2 border-[#FF5722] pl-3.5 py-0.5">
                <p className="text-[11px] leading-snug text-[#374151]">
                  <strong className="font-bold text-[#111827] mr-1">{v.trigger}</strong>
                  {v.outcome}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[10px] italic text-[#E31B54] font-medium mt-3">
            [Add or replace with scenarios relevant to your practice]
          </p>
        </section>

        {/* Dotted Horizontal Divider */}
        <div className="border-b border-dashed border-slate-200 my-3" />

        {/* Section 2: Questions we hear from employers */}
        <section className="mb-4">
          <h2 className="text-base font-extrabold text-[#111827]">Questions we hear from employers.</h2>
          <div className="w-7 h-0.5 bg-[#FF5722] my-1 mb-3" />

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="text-[11px] leading-relaxed">
                <p className="font-bold text-[#111827] mb-0.5">
                  <span className="text-[#FF5722] font-bold mr-1">Q:</span>
                  {faq.q}
                </p>
                <p className="text-[#374151]">
                  <span className="font-bold text-[#111827] mr-1">A:</span>
                  {faq.isCustom ? (
                    <span className="text-[#E31B54] italic font-medium">{faq.a}</span>
                  ) : (
                    faq.a
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Dotted Horizontal Divider */}
        <div className="border-b border-dashed border-slate-200 my-3" />

        {/* Section 3: Let's Talk & Contact Block */}
        <section className="mb-2">
          <h2 className="text-xl font-extrabold text-[#111827] mb-3">Let’s talk.</h2>

          <div className="flex justify-between items-center">
            {/* Left Contact Details */}
            <div className="space-y-1 text-xs">
              <p className="font-bold italic text-[#E31B54]">
                {contact.nameTitle || '[Your Name, Title]'}
              </p>
              <p className="font-bold italic text-[#E31B54]">
                {contact.practiceName || brand.practiceName || '[Practice Name]'}
              </p>
              <p className="font-bold italic text-[#E31B54]">
                {contact.phone || '[Phone number]'}
              </p>
              <p className="font-bold italic text-[#E31B54]">
                {contact.email || '[Email address]'}
              </p>
              <p className="font-bold italic text-[#E31B54]">
                {contact.address || '[Location / Address]'}
              </p>
            </div>

            {/* Right Soft Peach QR Box */}
            <div className="bg-[#FFF5F2] border border-[#FFE4DC] p-4 rounded-2xl flex flex-col items-center justify-center text-center w-52 shadow-xs">
              <p className="text-xs font-bold italic text-[#E31B54] mb-1">
                [Your QR Code Here]
              </p>
              <div className="w-3/4 h-px bg-[#FFD8CC] my-2" />
              <p className="text-[11px] text-[#4B5563] font-medium">
                Scan to visit our website
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Decorative Bottom Curved Gradient Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#FFEADF]/60 via-[#FFE4DC]/80 to-[#FFEADF]/60 pointer-events-none rounded-t-full opacity-70" />
    </div>
  );
};
