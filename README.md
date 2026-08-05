# DPC Employer Pitch Builder 📄✨

An interactive, web-based proposal and pitch creation platform developed for Direct Primary Care (DPC) practices and healthcare providers. Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**, this tool enables clinics to rapidly generate, customize, preview, and export high-resolution, print-ready 2-page B2B employer sales pitches in PDF format.

---

## 🚀 Key Features

* **⚡ Real-Time Form Editor**: Structured, collapsible form sections with inline character counters and real-time field validation.
* **📱 2-Page Live Preview**: Precise, responsive rendering matching standard **US Letter (8.5" × 11")** dimensions for instant visual feedback.
* **📄 Print-Ready PDF Export**: Generates clean, crisp, multi-page vector/raster PDFs directly from the browser using `html2canvas` and `jsPDF`.
* **🎨 Multiple View Modes**:
  * **Split View**: Side-by-side editing and live preview (optimized for desktop displays).
  * **Form Editor**: Full-width editing environment for focused content creation.
  * **Live Preview**: Full-screen view of the pitch document layout.
* **🎯 Sample Presets & Quick Reset**: Pre-loaded practice templates (e.g., *Riverside Direct Primary Care*, *Apex Health DPC*) for quick demonstration and testing.
* **🔒 Strict Schema Validation**: Validation powered by **Zod** ensuring all required pitch elements—such as practice branding, 3–8 team benefits, 3–6 timeline steps, and contact details—are completed prior to PDF export.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework & Language** | [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) |
| **Form Handling & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **PDF Generation** | [jsPDF](https://github.com/parallax/jsPDF), [html2canvas](https://html2canvas.hertzen.com/) |

---

## 📂 Repository Structure

```text
├── src/
│   ├── components/
│   │   ├── FormEditor/          # Collapsible form input sections (Header, Offer, Benefits, Process, Why, Contact)
│   │   ├── PitchDocument/       # 2-Page print document layout components (PitchPage1, PitchPage2)
│   │   ├── Header.tsx           # Application navigation header & export actions
│   │   └── PreviewContainer.tsx # Live preview frame with auto-scaling wrapper
│   ├── data/
│   │   └── defaultPitchData.ts  # Pre-loaded sample presets and default form state
│   ├── hooks/
│   │   └── usePitchForm.ts      # Custom hook managing form state, validation, and preset loading
│   ├── schemas/
│   │   └── pitchSchema.ts       # Zod validation schema for pitch fields & section bounds
│   ├── types/
│   │   └── pitch.ts             # TypeScript interfaces for pitch data model and view modes
│   ├── utils/
│   │   └── pdfExport.ts         # High-DPI canvas capture & PDF creation utility
│   ├── App.tsx                  # Main layout container & view switcher logic
│   └── main.tsx                 # Application entry point
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies & scripts
├── tailwind.config.js           # Tailwind design tokens & custom colors
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite configuration
```

---

## 📋 Prerequisites

* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher (or `yarn` / `pnpm`)

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/dpc-employer-pitch-builder.git
cd dpc-employer-pitch-builder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
Start the Vite dev server with hot module replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the URL output in your terminal).

---

## 🏗️ Build & Production Deployment

### Build for Production
To create an optimized production build:
```bash
npm run build
```
This compiles TypeScript and bundles static assets into the `dist/` folder.

### Preview Production Build
To test the built bundle locally:
```bash
npm run preview
```

---

## 📄 Pitch Document Structure

The generated 2-page PDF proposal includes:

1. **Page 1**:
   * **Header**: Practice Logo & Name, Document Title (*Healthcare Benefit Proposal for Your Team*).
   * **Core Offer Intro**: Overview of Direct Primary Care membership and clinic advantages.
   * **Team Benefits**: 3–8 customizable bullet points detailing coverage and perks.
   * **How It Works**: 3–6 step implementation timeline matrix (Discovery, Onboarding, Care Start).
2. **Page 2**:
   * **Why Employers Work With Us**: Narrative on cost reduction, employee retention, and decreased absenteeism.
   * **Contact & Terms**: Dedicated physician contact info, practice location, membership agreement terms, website link, and optional custom QR Code.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for details.
