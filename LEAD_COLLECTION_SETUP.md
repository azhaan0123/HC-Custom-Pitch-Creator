# Lead Collection Setup Guide (HubSpot, Google Sheets, PostgreSQL)

This guide explains how to connect your **HealthCompiler Custom Pitch Creator** lead collection modal to **HubSpot**, **Google Sheets**, or **PostgreSQL / Supabase**.

---

## 📍 Endpoint Configuration File

Location: `src/services/leadCollection.ts`

```typescript
// OPTION A: HubSpot Direct Integration (Recommended - No Backend Required!)
export const HUBSPOT_PORTAL_ID: string = 'YOUR_HUBSPOT_PORTAL_ID';
export const HUBSPOT_FORM_GUID: string = 'YOUR_HUBSPOT_FORM_GUID';

// OPTION B & C: Webhook / Google Sheet / Custom API Endpoint
export const LEAD_COLLECTION_ENDPOINT: string = 'YOUR_WEBHOOK_OR_API_URL_HERE';
```

---

## 🧡 Option 1: HubSpot Direct Integration (Recommended)

HubSpot provides a **Forms Submit API** that accepts submissions directly from frontend web applications without requiring a backend server or exposing secret API keys!

### Step 1: Create a HubSpot Form
1. Log into your **HubSpot** account.
2. Go to **Marketing** > **Forms** (or **Lead Capture** > **Forms**).
3. Click **Create form** (choose **Embedded Form** or **Standalone Page**).
4. Add the following fields to your form:
   - `First Name`
   - `Last Name`
   - `Email`
   - `Company Name` (or Practice Name)
5. Click **Publish** at the top right.

### Step 2: Get Your Portal ID and Form GUID
1. **Portal ID (Hub ID)**: Find your numeric Hub ID in the top-right corner of your HubSpot dashboard (e.g., `12345678`).
2. **Form GUID**: Click **Embed** or check the URL of your form editor:
   - Example embed URL: `https://js.hsforms.net/forms/embed/v2.js` with `formId: "a1b2c3d4-5678-90ab-cdef-1234567890ab"`.
   - The GUID looks like: `a1b2c3d4-5678-90ab-cdef-1234567890ab`.

### Step 3: Paste Portal ID & Form GUID in Code
Open `src/services/leadCollection.ts` and set:

```typescript
export const HUBSPOT_PORTAL_ID: string = '12345678';
export const HUBSPOT_FORM_GUID: string = 'a1b2c3d4-5678-90ab-cdef-1234567890ab';
```

Whenever a user submits their email and downloads a PDF pitch, a new Contact will automatically be created in your HubSpot CRM!

---

## 🟢 Option 2: Google Sheets (Google Apps Script)

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. In Row 1, add column headers:
   - `A1`: `Timestamp`
   - `B1`: `Name`
   - `C1`: `Email`
   - `D1`: `Practice Name`

### Step 2: Add Google Apps Script
1. Click **Extensions** > **Apps Script**.
2. Replace all existing code with the following snippet:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.practiceName || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy as Web App
1. Click **Deploy** > **New deployment**.
2. Select **Web app**.
3. Set **Who has access** to **`Anyone`**.
4. Click **Deploy** and copy the **Web app URL**.

### Step 4: Paste Web App URL in Code
Open `src/services/leadCollection.ts` and set:
```typescript
export const LEAD_COLLECTION_ENDPOINT = 'https://script.google.com/macros/s/.../exec';
```

---

## 🔵 Option 3: PostgreSQL / Supabase / Zapier Webhook

### Step 1: Create Database Table
Run the following DDL query in your PostgreSQL database or Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  practice_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Step 2: Set Webhook or API URL
Paste your API route or Zapier webhook URL into `LEAD_COLLECTION_ENDPOINT` in `src/services/leadCollection.ts`.
