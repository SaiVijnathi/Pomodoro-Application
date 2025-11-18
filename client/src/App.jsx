import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Pomodoro } from './components/Pomodoro'
import { Signup } from './components/Signup'
import { Login } from './components/Login'
import { Logout } from './components/Logout'
import { Sessions } from './components/Sessions'

function App() {

  return (
    <Routes>
        <Route path='/' element={<Pomodoro/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/logout' element={<Logout/>}/>
        {/* <Route path='/sessions' element={<Sessions/>}/> */}
        {/* <Route path='/login' element={<Signup/>}/> */}
    </Routes>
  )
}

export default App
