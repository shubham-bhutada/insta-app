import React,{ UseContext, useContext } from 'react'
import UserContext from './Context/UserContext'
// import all pages
import Signup from './Components/Signup'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  const {token, setToken} = useContext(UserContext);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </div>
  )
}

export default App