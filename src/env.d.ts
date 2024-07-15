/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly SUPABASE_URL: string
    readonly SUPABASE_KEY: string
    readonly SUPABASE_DB: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
