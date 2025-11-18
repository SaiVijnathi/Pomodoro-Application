import React, { useEffect, useRef, useState } from 'react'
import { Timer } from './Timer'
import { Navbar } from './Navbar';
import { Sessions } from './Sessions';

export const Pomodoro = () => {
    const [mode, setMode] = useState("focus");
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(1500);
    const intervalRef = useRef(null);
    const countRef = useRef(0);
    const [pause, setPause] = useState(false)

    const tokenRef = useRef(localStorage.getItem("token"))

    useEffect(()=>{
        document.body.className = mode;                
        if(isRunning){
            intervalRef.current = setInterval(()=>{
                setSeconds((prev)=>{
                    if(prev===0){
                        handleSwitchMode();
                        return prev
                    }
                    if(mode==="focus"){countRef.current+=1;}
                    return prev-1;
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
        setMode("focus")
    }
    
    const sendSessionData = async () => {
      const count = countRef.current;
      const userId = localStorage.getItem("userID")
      const data = {count, userId}
      let reqOptions = {
        method : "POST",
        body : JSON.stringify(data),
        headers : {
          "Content-Type" : "application/json"
        }
      }
      const JSONData = await fetch("http://localhost:4567/postSessionData", reqOptions)
      const JSOData = await JSONData.json();
      console.log(JSOData.status)
    }

    const handlePause = async () => {
      setIsRunning(false);
      if (mode === "focus") {
        await sendSessionData(); 
        setPause(prev => !prev); 
      } else {
        setPause(prev => !prev); 
      }
      countRef.current = 0;
    };


  return (
    <>
    <Navbar/>
    <div style={{width:"500px", height:"1px", backgroundColor:"rgba(0, 0, 0, 0.1)", margin:"0 auto 30px auto"}}/>
    <div className='pomo-grid'>
    <div></div>
         <div className='pomodoro-div' >
         <nav className='mode'>
           <ul>
             <li onClick={()=>{setMode("focus"); setSeconds(1500)}}  style={{
                 backgroundColor: mode === "focus" ? "#A44D4D" : "transparent"
               }}>Focus</li>
             <li onClick={()=>{setMode("shortBreak"); setSeconds(300)}}  style={{
                 backgroundColor: mode === "shortBreak" ? "#38858A" : "transparent"
               }}>Shortbreak</li>
             <li onClick={()=>{setMode("longBreak"); setSeconds(900)}}  style={{
                 backgroundColor: mode === "longBreak" ? "#397097" : "transparent"
              }}>Longbreak</li>
           </ul>
         </nav>
         <Timer seconds={seconds}/>
         <div className='controls'>
           <button onClick={()=>setIsRunning(true)}>Start</button>
           <button onClick={()=>handlePause()}>Pause</button>
          <button onClick={()=>resetTimer()}>Reset</button>
         </div>
     </div>
     <div>
      {
          tokenRef.current ? <Sessions pause={pause}/> : <></>
      }
     </div>
    </div>
    </>
  )
}
