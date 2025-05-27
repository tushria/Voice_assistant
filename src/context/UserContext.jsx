import React, { createContext,useState} from 'react'
import run from '../assets/gemini';
export const datacontext = createContext()

function UserContext({children}){

    let[speaking,setSpeaking]=useState(false)
    let [prompt,setPrompt]=useState("listening...")
    let [response,setResponse]=useState(false)

    function speak(text){
        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume=1;
        text_speak.rate=1;
        text_speak.pitch=1;
        text_speak.lang="hi-IN"
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(text_speak)
        text_speak.onend=()=>{
            setSpeaking(false)
        }
    }
    async function aiResponse(prompt){  
        let txt = prompt
            .replace(/dora/gi, "")
            .replace(/hello dora/gi, "")
            .replace(/hi dora/gi, "")
            .trim();
        let text = await run(txt);
        let newText=text.split("*")&&text.split("*")&&text.replace("google","Dora")&&text.replace("Google","Dora")
        setPrompt(newText)
        speak(newText)
        setResponse(true)
        // setTimeout(()=>{
        //     setSpeaking(false)
        // },5000)
        // console.log(text)
    }
    let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult=(e)=>{
        let currentIndex = e.resultIndex
        let transcript = e.results[currentIndex][0].transcript
        setPrompt(transcript)
        aiResponse(transcript)
        takeCommand(transcript.toLowerCase())
    }
    function takeCommand(command){
        if(command.includes("open")&& command.includes("youtube")){
            window.open("https://www.youtube.com/","_blank")
            speak("opening youtube")
            setResponse(true)
            setPrompt("opening youtube...")

            setTimeout(()=>{
                setSpeaking(false)
            },500)
        }
        else if(command.includes("open")&& command.includes("linkedinn")){
            window.open("linkedin.com/mynetwork/","_blank")
            speak("opening linked inn")
            setResponse(true)
            setPrompt("opening linked inn...")
            setTimeout(()=>{
                setSpeaking(false)
            },500)
        }else if(command.includes("open")&& command.includes("instagram")){
            window.open("https://www.instagram.com/accounts/login/?hl=en","_blank")
            setPrompt("opening instagram...")
            speak("opening instagram")
            setResponse(true)
            setTimeout(()=>{
                setSpeaking(false)
            },500)
        }
        else if(command.includes("time")){
            let time =new Date().toLocaleString(undefined,
                {hour:"numeric", minute:"numeric"})
                
                setResponse(true)
                speak(time)
        }
        else if(command.includes("date")){
            let date =new Date().toLocaleString(undefined,
                {hour:"numeric", month:"short"})
                
                setResponse(true)
                speak(date)
        }
        else{
            aiResponse(command)
        }
    }
    let value={
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse
    }
  return (
    <div>
        <datacontext.Provider value={value}>
            {children}
        </datacontext.Provider>
    </div>
  )
}

export default UserContext
