import React, { useContext, useState,useEffect } from 'react'
import "./App.css";
import dorara from "./assets/dora.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/UserContext';
import speakimg from './assets/listen.gif';
import ai from './assets/aiVoice.gif';
function App(){
  let {recognition,speaking,setSpeaking,prompt,response,setPrompt,setResponse} = useContext(datacontext)
  
  return (
    <>
      <div className='main'>
        <img src={dorara} alt="" id='dora'/>
        <span>I'm Dora ur Voice Assistant</span>
        {!speaking ? <button onClick={()=>{
          setPrompt("Listening..")
          setSpeaking(true)
          setResponse(false)
          recognition.start()
        }} role="button">Click me <CiMicrophoneOn/> </button>
      :
      <div className='response'>
        {!response ? <img src={speakimg} alt="" id='speak'/>
        :
        <img src={ai} alt="" id='ai'/>
        
        }
        <p className='prompt'>{prompt}</p>
      </div>
      }
        
      </div>
    </>
  )
}

export default App
