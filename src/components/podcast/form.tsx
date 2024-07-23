import { Dropdown } from "flowbite"
import { useEffect, useRef, useState } from "react"
import VoiceItem from "@/components/podcast/voice-item.tsx"
import { voiceSelection } from "@/lib/constants"

export default function() {
    let dropdownListRef = useRef()
    let dropdownTriggerRef = useRef()
    let dd:Dropdown;

    let [ voice, setVoice ] = useState("none")

    useEffect(() => {
        dd = new Dropdown(dropdownListRef.current, dropdownTriggerRef.current)
    }, [])

    function handleVoiceSelect(event) {
        dd = new Dropdown(dropdownListRef.current, dropdownTriggerRef.current)
        setVoice(event.currentTarget.value)
        dd.hide()
    }

    async function handleSubmit(event) {
        let fd = new FormData(event.currentTarget)
        fd.append("voice", voice)

        let audioFile = fd.get("audio_file")

        if (audioFile === "" || audioFile === null) {
            console.log(audioFile)
            event.preventDefault()
        }

        // TODO use LocalAI
        // if (voice === "none" || !voice.length) {
        //     event.preventDefault()
        // }

        await fetch("/~api/podcast", {
            method: "POST",
            body: fd
        })
    }

    return (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="block">
                <label htmlFor="title" className="block mb-2 text-sm font-medium">Podcast Title</label>
                <input type="text" name="title" id="title" className="input-text text-sm w-full" placeholder="title" required />
            </div>
            <div className="block">
                <label htmlFor="description" className="block mb-2 text-sm font-medium">Description</label>
                <textarea 
                    id="description" 
                    rows={4} 
                    className="input-text text-sm w-full resize-none" 
                    placeholder="write your thoughts here..."
                ></textarea>
            </div>
            <div className="border h-0.5"></div>
            <div>
                <label className="block mb-2 text-sm font-medium" htmlFor="file_input">Upload Audio File <small>(mp3 | mp4)</small></label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="audio_file" name="audio_file" type="file" />
            </div>
            <div className="inline-flex items-center justify-center self-center w-2/3 border">
                <span className="absolute px-3 font-medium bg-zinc-950 text-stone-100 -translate-x-1/2  left-1/2 dark:text-white dark:bg-gray-900">or</span>
            </div>
            <div className="relative">
                <label htmlFor="dropdown-btn" className="block mb-2 text-sm font-medium">Select Voice Prompt</label>
                <div className="flex items-center gap-4">
                    <div id="dropdown-btn" ref={dropdownTriggerRef}  className="dropdown-btn px-4 py-2 font-medium rounded-lg flex items-center w-full justify-between text-sm">
                        <input type="button" onClick={handleVoiceSelect} value={voice} />
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </div>
                </div>
                <div ref={dropdownListRef} id="dropdown-list" className="z-10 hidden w-full bg-white divide-y divide-gray-100 shadow dark:bg-gray-700">
                    <ul className="text-sm text-gray-700 dark:text-gray-200">
                        {
                            voiceSelection.map((v) => (
                                <VoiceItem key={v.id} name={v.name} handleVoiceSelect={handleVoiceSelect} />
                            ))
                        }
                    </ul>
                </div>
                {
                    voice !== "none" && (
                        <audio 
                            className="hidden"
                            src={`/voices/${voice}.mp3`}
                            autoPlay
                        />
                    )
                }
            </div>
            <div className="block">
                <label htmlFor="prompt" className="block mb-2 text-sm font-medium">Text to Prompt Voice</label>
                <textarea 
                    id="prompt"
                    name="prompt" 
                    rows={4} 
                    className="input-text text-sm w-full resize-none" 
                    placeholder="provide text to generate audio"
                ></textarea>
            </div>
            {
                // TODO after the voice and image is generated show here
                <div className="border h-0.5"></div>
            }
            <button className="btn text-sm p-2 rounded-lg font-semibold" type="submit">
                Submit
            </button>
        </form>
    )
}
