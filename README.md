# DPC Employer Pitch Builder 📄✨

An interactive, web-based proposal and pitch creation module developed for Direct Primary Care (DPC) practices and healthcare providers. Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**, this self-contained module enables clinics to rapidly generate, customize, preview, and export high-resolution, print-ready 2-page B2B employer sales pitches in PDF format.

Designed for **instant drop-in integration** into any existing Next.js website or application.

---

## 🚀 Key Features

* **⚡ Real-Time Form Editor**: Structured, collapsible form sections with inline character counters, accent color pickers, and real-time field validation.
* **📱 2-Page Live Preview**: Precise, responsive rendering matching standard **US Letter (8.5" × 11")** dimensions with independent panel scrolling.
* **📄 Print-Ready PDF Export**: Generates clean, high-DPI multi-page vector/raster PDFs directly from the browser using `html2canvas` and `jsPDF`.
* **🎨 Multiple View Modes**:
  * **Split View**: Side-by-side editing and live preview (optimized for desktop displays).
  * **Form Editor**: Full-width editing environment for focused content creation.
  * **Live Preview**: Full-screen view of the pitch document layout.
* **🎯 Sample Presets & Quick Reset**: Pre-loaded practice templates for quick demonstration and testing.
* **🧲 Built-in Lead Collection**: Modal form captures lead contact info (Name & Email) prior to PDF generation, automatically posting to **HubSpot CRM**, **Google Sheets**, or custom webhooks.
* **🔒 Strict Schema Validation**: Validation powered by **Zod** ensuring all required pitch elements—such as practice branding, 3–8 team benefits, 3–6 timeline steps, and contact details—are completed prior to PDF export.

---

## 📦 How to Integrate Into an Existing Next.js Website

This project is built as a self-contained module. Follow these simple steps to add the DPC Pitch Creator to your existing Next.js (App Router or Pages Router) codebase:

### Step 1: Copy Module Folders
Copy the following self-contained folders directly into your target Next.js repository:

```text
your-nextjs-website/
├── app/
│   └── pitch-creator/
│       └── page.tsx                 ← Copy from app/pitch-creator/page.tsx
├── components/
│   └── pitch-creator/               ← Copy entire components/pitch-creator/ folder
├── lib/
│   └── pitch-creator/               ← Copy entire lib/pitch-creator/ folder
├── styles/
│   └── pitch-creator.css            ← Copy styles/pitch-creator.css
└── public/
    └── PB-Logo.svg                  ← Copy public/PB-Logo.svg
```

---

### Step 2: Install Required Dependencies
If your existing Next.js project does not already have these dependencies, install them:

```bash
npm install @radix-ui/react-collapsible @radix-ui/react-label @radix-ui/react-slot @radix-ui/react-tooltip class-variance-authority clsx tailwind-merge tailwindcss-animate lucide-react react-hook-form @hookform/resolvers zod html2canvas jspdf qrcode @fontsource/geist-sans

npm install -D @types/qrcode
```

---

### Step 3: Update `tailwind.config.js` (or `.ts`)
Add the `pitch-creator` paths to your `content` array so Tailwind builds all required component styles, animations, and color utilities:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Add these two lines:
    "./components/pitch-creator/**/*.{js,ts,jsx,tsx}",
    "./lib/pitch-creator/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        docBg: '#F9F5F2',
        docBorder: '#E0D8D0',
      },
      keyframes: {
        "collapsible-down": {
          "0%": { height: "0", opacity: "0", transform: "translateY(-6px)" },
          "70%": { height: "var(--radix-collapsible-content-height)", opacity: "1", transform: "translateY(2px)" },
          "100%": { height: "var(--radix-collapsible-content-height)", opacity: "1", transform: "translateY(0)" },
        },
        "collapsible-up": {
          "0%": { height: "var(--radix-collapsible-content-height)", opacity: "1", transform: "translateY(0)" },
          "100%": { height: "0", opacity: "0", transform: "translateY(-6px)" },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.35s cubic-bezier(0.34, 1.45, 0.64, 1)",
        "collapsible-up": "collapsible-up 0.22s cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

---

### Step 4: Ensure Scoped CSS is Loaded
The module styles are contained in `styles/pitch-creator.css`. In `app/pitch-creator/page.tsx`, it is imported at the top level:

```typescript
import '@/styles/pitch-creator.css';
```

If your project uses custom path aliases (like `@/components` or `~/components`), ensure `tsconfig.json` resolves `@/*` to your project root.

---

### Step 5: Configure Environment Variables
Copy the environment variables from `.env.example` into your project's `.env.local`:

```env
# Option A: HubSpot Forms API Integration (No backend required)
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=21742361
NEXT_PUBLIC_HUBSPOT_FORM_GUID=d680b63c-2191-4dab-961b-d78be9b3027d

# Option B: Custom Webhook / Google Sheets / PostgreSQL Endpoint
NEXT_PUBLIC_LEAD_COLLECTION_ENDPOINT=https://your-api-endpoint.com/leads
```

---

### Step 6: Verify Integration
Start your dev server:
```bash
npm run dev
```
Navigate to `http://localhost:3000/pitch-creator`. The DPC Pitch Builder will load seamlessly as a route within your website!

---

## 🛠️ Standalone Project Architecture

```text
├── app/
│   ├── layout.tsx                # Next.js Root Layout
│   ├── page.tsx                  # Redirects to /pitch-creator
│   ├── globals.css               # Global Tailwind CSS directives
│   └── pitch-creator/
│       └── page.tsx              # Single route entry point
├── components/
│   └── pitch-creator/
│       ├── PitchCreatorApp.tsx   # Main orchestrator (client component)
│       ├── Header.tsx            # View switcher & export controls
│       ├── PreviewContainer.tsx  # Zoomable live document canvas
│       ├── ExportLeadDialog.tsx  # Lead capture modal dialog
│       ├── FormEditor/           # Form sections (Header, Offer, Benefits, Process, Why, Vignettes, FAQs, Contact)
│       ├── PitchDocument/        # Print page templates (PitchPage1, PitchPage2)
│       └── ui/                   # Primitive UI components (button, card, input, color-picker, etc.)
├── lib/
│   └── pitch-creator/
│       ├── defaults.ts           # Sample preset data
│       ├── hooks.ts              # usePitchForm custom hook with debounced sync
│       ├── lead-collection.ts    # HubSpot & Webhook submission service
│       ├── pdf-export.ts         # html2canvas + jsPDF engine
│       ├── qr-generator.ts       # Soldair node-qrcode SVG generator
│       ├── schema.ts             # Zod validation schema
│       └── types.ts              # TypeScript interfaces
├── styles/
│   └── pitch-creator.css         # Scoped document & canvas CSS
├── .env.local                    # Local environment variables
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies & scripts
└── tailwind.config.js            # Tailwind CSS configuration
```

---

## 🧲 Lead Collection & HubSpot CRM Setup

When a user clicks **Export PDF**, a lead capture modal prompts for their Name and Email. The submission service (`lib/pitch-creator/lead-collection.ts`) handles dispatching:

### Option A: HubSpot Forms API (Direct CRM Integration)
1. Go to **HubSpot -> Marketing -> Forms -> Create Form**.
2. Add fields: `First Name`, `Last Name`, `Email`, `Company Name`.
3. Obtain your **Portal ID** (top right of HubSpot) and **Form GUID** (from form embed URL).
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_HUBSPOT_PORTAL_ID=12345678
   NEXT_PUBLIC_HUBSPOT_FORM_GUID=a1b2c3d4-5678-90ab-cdef-1234567890ab
   ```

### Option B: Google Sheets / Custom Webhook
1. Deploy a Google Apps Script Web App or Zapier Webhook.
2. Add the URL to `.env.local`:
   ```env
   NEXT_PUBLIC_LEAD_COLLECTION_ENDPOINT=https://script.google.com/macros/s/.../exec
   ```

---

## 🏗️ Local Development Scripts

```bash
# Start development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm start
```

---

## 📄 Pitch Document Specifications

* **Dimensions**: Standard US Letter (8.5" × 11") per page.
* **Page 1**: Practice Logo & Name, Core Offer Intro, Bulleted Benefits, Timeline Matrix, Why Employers Value Proposition.
* **Page 2**: Employee Care Scenarios, Employer FAQs, Physician Contact Block, Custom QR Code.

---

## 📝 License

Distributed under the MIT License.
