import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../../screens/Login'
import Home from '../../screens/Home'
import Signup from '../../screens/Signup'

const Routing = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/home' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Routing