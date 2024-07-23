/// <reference types="astro/client" />

import type { SupabaseClient } from "@supabase/supabase-js"
import type OpenAI from "openai"

interface ImportMetaEnv {
    readonly SUPABASE_URL: string;
    readonly SUPABASE_KEY: string;
    readonly SUPABASE_DB: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare namespace App {
    interface Locals {
        supabase: SupabaseClient;
        openai: OpenAI;
    }
}
