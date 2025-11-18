import React, { useEffect, useState } from 'react'

export const Sessions = ({pause}) => {
  const [sessions, setSessions] = useState([]);

    const apiBase = import.meta.env.VITE_API_URL;

  const sessionsData = async () => {
    const userId = localStorage.getItem("userID");
    console.log(userId)
    let reqOptions = {
      method : "POST",
      body: JSON.stringify({userId}),
      headers : {
        "Content-Type" : "application/json"
      }
    }
    const JSONData = await fetch(`${apiBase}/getSessionData`, reqOptions);
    const JSOData = await JSONData.json();
    console.log(JSOData.data)
    setSessions([...JSOData.data])
  }

  useEffect(()=>{
    sessionsData();
  },[pause])

  return (
    <div>
        {
          sessions.length>0?(
            <div className='sessions-div'>
            <div style={{fontSize:"18px", marginBottom:"10px", fontWeight:"500"}}>Focus Sessions</div>
              { 
                sessions.map((session,i)=>(
                  <div key={i} className='sessions'>
                  <span>{session.minutes}min : {session.seconds}sec</span>
                  </div>
                ))
              }
            </div>
          ):(
            <div>No Sessions yet.</div>
          )
        }
    </div>
  )
}
