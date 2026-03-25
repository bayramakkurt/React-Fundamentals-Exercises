import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Auth from '../pages/Auth.jsx'

function RouterConfig() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth' element={<Auth/>} />
    </Routes>
  )
}

export default RouterConfig