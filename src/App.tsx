import React from 'react'
import {BrowserRouter,Navigate,Routes,Route} from "react-router-dom"
import { useSelector } from "react-redux";
import Login from './scenes/Auth/Login'
import Signup from './scenes/Auth/Signup';
import Home from './scenes/Home/Home'


function App() {
  const isAuth=Boolean(useSelector((state:any)=>state?.token))  
  return (
    <div>
        <BrowserRouter>
        <Routes>
         <Route path="/" element={<Login/>}/>
         <Route path="/signup" element={<Signup />} />
         <Route path="/home" element={isAuth?<Home/>:<Navigate to={'/'}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App