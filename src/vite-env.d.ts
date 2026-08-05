/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HUBSPOT_PORTAL_ID?: string;
  readonly VITE_HUBSPOT_FORM_GUID?: string;
  readonly VITE_LEAD_COLLECTION_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
