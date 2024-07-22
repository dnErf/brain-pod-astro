import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ locals, request }) => {
    let fd = await request.formData()
    let title = fd.get("title")
    let description = fd.get("description")
    let prompt = fd.get("prompt")
    let voice = fd.get("voice")
    let fileInput = fd.get("file_input") as File
    let fileBuf = await fileInput.arrayBuffer()

    const { data, error} = await locals.supabase.storage.from("temp").upload(fileInput.name, Buffer.from(fileBuf), {
        contentType: fileInput.type
    })

    if (error) {
        console.log(error)
    }

    if (voice !== "none" && prompt !== "") {
        // TODO need open ai credits to test
        // with openai text to speech
        // let mp3 = await locals.openai.audio.speech.create({
        //     model: "tts-1",
        //     voice: voice,
        //     input: prompt,
        // })
        // let buffer = await mp3.arrayBuffer()
        // await locals.supabase.storage.from("temp").upload(`${title}.mp3`, buffer, {
        //     contentType: "audio/mpeg"
        // })
    }

    return new Response(null, { status: 200 })
}

/*
console.log("===")
console.log(data)
-- data after file uploaded and no error
{
  path: 'mw_clipchamp.mp4',
  id: '900e51c5-ff9a-4332-bd2f-38e14c2f38f5',
  fullPath: 'temp/mw_clipchamp.mp4'
}
*/
