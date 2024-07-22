import { openai } from "@/lib/openai"
import { supabase } from "@/lib/supabase"
import { sequence } from "astro:middleware"

async function dependencies(context, next) {
    context.locals.supabase = supabase
    context.locals.openai = openai

    // let { data, error } = await supabase.auth.getUser()

    // console.log("=== middleware")

    // if (context.url.pathname === "/auth/register" || context.url.pathname === "/~api/auth") {
    //     if (data.user === null) {
    //         console.log("=== here")
    //         return next()
    //     } else {
    //         return context.redirect("/")
    //     }
    // }

    // if (context.url.pathname !== "/auth/register" || context.url.pathname !== "/~api/auth") {
    //     if (data.user === null) {
    //         return context.redirect("/auth/register")
    //     } else {
    //         return next()
    //     }
    // }

    return next()
}

export const onRequest = sequence(dependencies)