import React from 'react'

export const Timer = ({seconds}) => {

  console.log(seconds)

    const formatTime = (s) =>{
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2,"0")}`;
    }

  return (
    <div className="timer">
        {formatTime(seconds)}
    </div>
  )
}
