import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Pomodoro } from './components/Pomodoro'
import { Signup } from './components/Signup'
import { Login } from './components/Login'

function App() {

  return (
    <Routes>
        <Route path='/' element={<Pomodoro/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        {/* <Route path='/login' element={<Signup/>}/>
        <Route path='/login' element={<Signup/>}/>
        <Route path='/login' element={<Signup/>}/> */}
    </Routes>
  )
}

export default App
