import React, { useEffect, useRef, useState } from 'react'
import { Timer } from './Timer'
import { Navbar } from './Navbar';

export const Pomodoro = () => {
    const [mode, setMode] = useState("focus");
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(1500);
    const intervalRef = useRef(null);

    useEffect(()=>{
        document.body.className = mode;                
        if(isRunning){
            intervalRef.current = setInterval(()=>{
                setSeconds((prev)=>{
                    if(prev===0){
                        handleSwitchMode();
                        return prev
                    }
                    return prev-1
                })
            },1000)
        }
        return () => clearInterval(intervalRef.current)
    },[isRunning, mode])

    const handleSwitchMode = () => {
        if(mode == "focus"){
            setMode("shortBreak");
            setSeconds(300);
        }
        if(mode=="shortBreak"){
            setMode("longBreak");
            setSeconds(900);
        }
        if(mode=="longBreak"){
            setMode("focus");
            setSeconds(1500);
        }
    }

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setSeconds(1500);
        setIsRunning(false);
    }

  return (
    <div className={`pomodoro-page ${mode}`}>
      <Navbar/>
      <div style={{width:"500px", height:"1px", backgroundColor:"rgba(0, 0, 0, 0.1)", margin:"0 auto 30px auto"}}/>
         <div className='pomodoro-div' >
         <nav className='mode'>
           <ul>
             <li onClick={()=>{setMode("focus"); setSeconds(1500)}}  style={{
                 backgroundColor: mode === "focus" ? "#A44D4D" : "transparent",
               }}>Focus</li>
             <li onClick={()=>{setMode("shortBreak"); setSeconds(300)}}  style={{
                 backgroundColor: mode === "shortBreak" ? "#38858A" : "transparent",
               }}>Shortbreak</li>
             <li onClick={()=>{setMode("longBreak"); setSeconds(900)}}  style={{
                 backgroundColor: mode === "longBreak" ? "#397097" : "transparent",
              }}>Longbreak</li>
           </ul>
         </nav>
         <Timer seconds={seconds}/>
         <div className='controls'>
           <button onClick={()=>setIsRunning(true)}>Start</button>
           <button onClick={()=>setIsRunning(false)}>Pause</button>
          <button onClick={()=>resetTimer()}>Reset</button>
         </div>
     </div>
    </div>
  )
}
