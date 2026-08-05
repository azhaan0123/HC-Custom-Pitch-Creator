/**
 * Lead Collection Service & Endpoint Configuration
 * 
 * ============================================================================
 * HOW TO CONFIGURE YOUR ENDPOINT / HUBSPOT / GOOGLE SHEETS / POSTGRES:
 * ============================================================================
 * 
 * ----------------------------------------------------------------------------
 * OPTION A: HubSpot Direct Integration (Recommended - No Backend Required!)
 * ----------------------------------------------------------------------------
 * 1. Log into HubSpot -> Go to Marketing -> Forms -> Create a new Form.
 * 2. Add fields: First Name, Last Name, Email, Company Name.
 * 3. Save & Publish your form.
 * 4. Copy your Hub ID (Portal ID) from the top-right corner (e.g., '12345678').
 * 5. Copy your Form GUID from the form embed code URL (e.g., 'a1b2c3d4-5678-90ab-cdef-1234567890ab').
 * 6. Set HUBSPOT_PORTAL_ID and HUBSPOT_FORM_GUID below!
 * 
 * ----------------------------------------------------------------------------
 * OPTION B: Google Sheets (Google Apps Script Web App / Webhook)
 * ----------------------------------------------------------------------------
 * 1. Open your Google Sheet -> Click Extensions -> Apps Script.
 * 2. Replace code with:
 *    ```javascript
 *    function doPost(e) {
 *      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *      var data = JSON.parse(e.postData.contents);
 *      sheet.appendRow([new Date(), data.name, data.email, data.practiceName || '']);
 *      return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
 *        .setMimeType(ContentService.MimeType.JSON);
 *    }
 *    ```
 * 3. Click Deploy -> New Deployment -> Web App -> Set "Who has access" to "Anyone".
 * 4. Copy the Web App URL and paste it into LEAD_COLLECTION_ENDPOINT below.
 * 
 * ----------------------------------------------------------------------------
 * OPTION C: PostgreSQL / Supabase / Express API / Zapier Webhook
 * ----------------------------------------------------------------------------
 * 1. Create a table in PostgreSQL / Supabase or set up a Zapier Webhook trigger.
 * 2. Paste your API endpoint URL into LEAD_COLLECTION_ENDPOINT below.
 * ============================================================================
 */

// Environment Variables (Loaded securely from .env.local via Vite import.meta.env)
export const HUBSPOT_PORTAL_ID: string = import.meta.env.VITE_HUBSPOT_PORTAL_ID || '';
export const HUBSPOT_FORM_GUID: string = import.meta.env.VITE_HUBSPOT_FORM_GUID || '';
export const LEAD_COLLECTION_ENDPOINT: string = import.meta.env.VITE_LEAD_COLLECTION_ENDPOINT || '';

export interface LeadPayload {
  name: string;
  email: string;
  practiceName?: string;
  timestamp: string;
}

export async function submitLeadData(payload: LeadPayload): Promise<void> {
  console.log('[Lead Collection] Lead captured:', payload);

  // 1. Check if HubSpot Direct Integration is configured
  if (HUBSPOT_PORTAL_ID.trim() !== '' && HUBSPOT_FORM_GUID.trim() !== '') {
    const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID.trim()}/${HUBSPOT_FORM_GUID.trim()}`;
    
    // Parse First Name and Last Name
    const nameParts = payload.name.trim().split(' ');
    const firstname = nameParts[0] || '';
    const lastname = nameParts.slice(1).join(' ') || '';

    const hubspotBody = {
      fields: [
        { name: 'firstname', value: firstname },
        { name: 'lastname', value: lastname },
        { name: 'email', value: payload.email },
        { name: 'company', value: payload.practiceName || '' },
      ],
      context: {
        pageUri: typeof window !== 'undefined' ? window.location.href : '',
        pageName: 'DPC Employer Pitch Builder',
      },
    };

    try {
      console.log('[HubSpot Lead Collection] Submitting to HubSpot Forms API...');
      const res = await fetch(hubspotUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotBody),
      });

      if (res.ok) {
        console.log('[HubSpot Lead Collection] Lead successfully created in HubSpot CRM!');
      } else {
        const errorText = await res.text();
        console.warn(`[HubSpot Lead Collection] HubSpot API returned status ${res.status}:`, errorText);
      }
    } catch (err) {
      console.error('[HubSpot Lead Collection] Failed to post lead to HubSpot:', err);
    }
  }

  // 2. Check if Webhook / Custom API Endpoint is configured
  if (LEAD_COLLECTION_ENDPOINT.trim() !== '') {
    try {
      console.log('[Webhook Lead Collection] Submitting lead payload to endpoint...');
      const response = await fetch(LEAD_COLLECTION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.warn(`[Webhook Lead Collection] Endpoint returned HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('[Webhook Lead Collection] Network error dispatching lead data:', error);
    }
  }

  // 3. Fallback info if neither is set
  if (!HUBSPOT_PORTAL_ID.trim() && !LEAD_COLLECTION_ENDPOINT.trim()) {
    console.info(
      '[Lead Collection] Endpoint is empty. Lead data logged locally. Configure HUBSPOT_PORTAL_ID or LEAD_COLLECTION_ENDPOINT in src/services/leadCollection.ts to collect leads directly into HubSpot, Google Sheets, or PostgreSQL.'
    );
  }
}
