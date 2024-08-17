import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage, SignUpPage, ActivationPage } from './routes.js'
import HomePage from './pages/HomePage.jsx'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>     
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/sign-up' element={<SignUpPage />}/>     
        <Route path='/activation/:activation_token' element={<ActivationPage />}/>     
      </Routes>
    </BrowserRouter>
  )
}

export default App