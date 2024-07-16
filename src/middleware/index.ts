import { supabase } from "@/lib/supabase"
import { sequence } from "astro:middleware"

async function dependencies(context, next) {
    context.locals.supabase = supabase
    return next()
}

export const onRequest = sequence(dependencies)