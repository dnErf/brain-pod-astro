import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ locals, request, redirect }) => {
    let fd = await request.formData()
    let email = fd.get("email").toString()

    const { error } = await locals.supabase.auth.signInWithOtp({
        email: email,
        options: {
            emailRedirectTo: 'http://localhost:4321/~api/auth'
        }
    })

    if (error) {
        return redirect("/auth/register")
    }

    return new Response(JSON.stringify({ message: "hello" }), { status: 200 })
}

export const GET: APIRoute = async ({ locals, cookies, redirect, url }) => {
    let authCode = url.searchParams.get("code")

    try
    {
        let { data, error } = await locals.supabase.auth.exchangeCodeForSession(authCode)
        
        cookies.set("sb-access-token", data.session.access_token, { path: "/" })
        cookies.set("sb-refresh-token", data.session.refresh_token, { path: "/" })

        return redirect("/")
    }
    catch (err)
    {
        console.log(err)

        return redirect("/auth/register")
    }
}
