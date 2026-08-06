'use client';

import React from 'react';
import { PitchData } from '@/lib/pitch-creator/types';
import { useQRCode } from '@/lib/pitch-creator/qr-generator';
import { blendHexColor } from '@/lib/pitch-creator/utils';

interface PitchPage2Props {
  data: PitchData;
}

export const PitchPage2: React.FC<PitchPage2Props> = ({ data }) => {
  const { contact, brand } = data;
  const accentColor = brand.accentColor || '#ef9493';

  // Compute QR Code Fill Color (Black | Accent Color | Custom)
  const qrColorMode = contact.qrColorMode || 'black';
  let qrFillColor = '#111827';
  if (qrColorMode === 'accent') {
    qrFillColor = accentColor;
  } else if (qrColorMode === 'custom') {
    qrFillColor = contact.qrCustomColor || '#ef9493';
  }

  // Generate QR Code using Soldair node-qrcode library
  const qrTargetUrl = contact.websiteUrl || 'https://www.exampledpc.com';
  const qrSvg = useQRCode(qrTargetUrl, { fillColor: qrFillColor, margin: 2 });

  // Dynamic Vignettes / Employee Care Scenarios
  const vignettesTitle = data.vignettes?.title || 'What happens when your employees can actually reach their doctor.';
  const vignettesList = data.vignettes?.items && data.vignettes.items.length > 0
    ? data.vignettes.items
    : [
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
      ];

  // Dynamic FAQs / Employer Questions
  const faqsTitle = data.faqs?.title || 'Questions we hear from employers.';
  const faqsList = data.faqs?.items && data.faqs.items.length > 0
    ? data.faqs.items.map((item) => ({
        id: item.id,
        q: item.question,
        a: item.answer,
        isCustom: item.isCustom || false,
      }))
    : [
        {
          id: 'faq-1',
          q: 'Does this replace our insurance?',
          a: 'No. We cover primary care. Your employees keep their insurance for everything else. Most employers we work with pair this with a high-deductible plan, which brings their premiums down.',
          isCustom: false,
        },
        {
          id: 'faq-2',
          q: 'What if our employees already have a doctor they like?',
          a: 'That is completely fine. We work alongside their existing care. No one is required to switch. What we find is that most employees start using us for the convenience and the access, and it becomes their preferred first call over time.',
          isCustom: false,
        },
        {
          id: 'faq-3',
          q: 'How will we know it is working?',
          a: 'We share quarterly reports with you covering engagement, utilization, cost savings, and health outcomes. You will always have full visibility into what your employees are getting and what value is being delivered.',
          isCustom: false,
        },
        {
          id: 'faq-4',
          q: 'What is the commitment?',
          a: contact.contractTerms
            ? contact.contractTerms
            : '12-month agreement with a 60-day cancellation clause',
          isCustom: true,
        },
        {
          id: 'faq-5',
          q: 'What does this cost us?',
          a: 'We will walk you through the pricing when we meet. It depends on your team size and what you need. What we can tell you now is that for most employers, the membership cost is a fraction of what a single ER visit costs per employee.',
          isCustom: false,
        },
      ];

  const qrBoxBg = blendHexColor(accentColor, '#ffffff', 0.08);
  const qrBoxBorder = blendHexColor(accentColor, '#ffffff', 0.35);
  const qrInnerBorder = blendHexColor(accentColor, '#ffffff', 0.25);
  const qrDividerColor = blendHexColor(accentColor, '#ffffff', 0.4);

  return (
    <div className="document-page flex flex-col justify-between select-none relative overflow-hidden bg-white text-[#111827]">
      {/* Top Accent Bar */}
      <div className="w-full h-1 -mt-1 -mx-1 mb-5" style={{ backgroundColor: accentColor }} />

      <div className="flex-1 flex flex-col justify-between">
        {/* Section 1: Employee Care Scenarios */}
        <section className="mb-4">
          <h1 className="text-xl font-extrabold text-[#111827] tracking-tight leading-snug mb-3">
            {vignettesTitle}
          </h1>

          <div className="space-y-3 pl-1">
            {vignettesList.map((v, idx) => (
              <div key={v.id || idx} className="border-l-2 pl-3.5 py-0.5" style={{ borderColor: accentColor }}>
                <p className="text-[11px] leading-snug text-[#374151]">
                  <strong className="font-bold text-[#111827] mr-1">{v.trigger}</strong>
                  {v.outcome}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Dotted Horizontal Divider */}
        <div className="border-b border-dashed border-slate-200 my-3" />

        {/* Section 2: Questions we hear from employers */}
        <section className="mb-4">
          <h2 className="text-base font-extrabold text-[#111827]">{faqsTitle}</h2>
          <div className="w-7 h-0.5 my-1 mb-3" style={{ backgroundColor: accentColor }} />

          <div className="space-y-2.5">
            {faqsList.map((faq, idx) => (
              <div key={faq.id || idx} className="text-[11px] leading-relaxed">
                <p className="font-bold text-[#111827] mb-0.5">
                  <span className="font-bold mr-1" style={{ color: accentColor }}>Q:</span>
                  {faq.q}
                </p>
                <p className="text-[#374151]">
                  <span className="font-bold text-[#111827] mr-1">A:</span>
                  {faq.isCustom ? (
                    <span className="italic font-medium" style={{ color: accentColor }}>{faq.a}</span>
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
          <h2 className="text-xl font-extrabold text-[#111827] mb-3">Let&apos;s talk.</h2>

          <div className="flex justify-between items-center">
            {/* Left Contact Details */}
            <div className="space-y-1 text-xs">
              <p className="font-bold italic" style={{ color: accentColor }}>
                {contact.nameTitle || '[Your Name, Title]'}
              </p>
              <p className="font-bold italic" style={{ color: accentColor }}>
                {contact.practiceName || brand.practiceName || '[Practice Name]'}
              </p>
              <p className="font-bold italic" style={{ color: accentColor }}>
                {contact.phone || '[Phone number]'}
              </p>
              <p className="font-bold italic" style={{ color: accentColor }}>
                {contact.email || '[Email address]'}
              </p>
              <p className="font-bold italic" style={{ color: accentColor }}>
                {contact.address || '[Location / Address]'}
              </p>
            </div>

            {/* Right Soft QR Box (Dynamically matches accent color using solid blend, preventing html2canvas color drop & text clipping) */}
            <div
              className="p-3.5 rounded-2xl flex flex-col items-center justify-center text-center w-52 shadow-xs transition-colors"
              style={{
                backgroundColor: qrBoxBg,
                borderColor: qrBoxBorder,
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
            >
              {qrSvg ? (
                <div
                  className="w-24 h-24 bg-white p-1.5 rounded-xl shadow-2xs overflow-hidden flex items-center justify-center"
                  style={{
                    borderColor: qrInnerBorder,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
              ) : (
                <div
                  className="w-24 h-24 bg-white/60 rounded-xl flex items-center justify-center text-[10px] text-slate-400 italic"
                  style={{
                    borderColor: qrInnerBorder,
                    borderWidth: '1px',
                    borderStyle: 'dashed',
                  }}
                >
                  [QR Code]
                </div>
              )}
              <div
                className="w-3/4 h-px my-2.5"
                style={{ backgroundColor: qrDividerColor }}
              />
              <p
                className="text-[10px] font-semibold leading-snug break-all max-w-[190px] text-center pt-0.5 pb-1"
                style={{ color: '#374151' }}
              >
                {contact.websiteUrl ? contact.websiteUrl.replace(/^https?:\/\//, '') : 'Scan to visit website'}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Decorative Bottom Curved Gradient Bar (Dynamically matches accent color using solid blend) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-4 pointer-events-none rounded-t-full opacity-80"
        style={{
          background: `linear-gradient(to right, ${blendHexColor(accentColor, '#ffffff', 0.25)}, ${blendHexColor(accentColor, '#ffffff', 0.55)}, ${blendHexColor(accentColor, '#ffffff', 0.25)})`,
        }}
      />
    </div>
  );
};
