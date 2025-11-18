import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const token = localStorage.getItem("token");
  return (
    <div className='navbar'>
        <div id='logo'>Pomodoro</div>
        {token?(<ul>
            <li><Link to='/logout'>Logout</Link></li>
        </ul>):(
          <ul>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
          </ul>
        )
        }
    </div>
  )
}
