import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import LogInRegister from '../../pages/LogIn/LogIn.jsx';
import LogIn from '../../pages/LogIn/LogIn.jsx';
import Register from '../../pages/Register/Register.jsx';
import Home from '../../pages/Home/Home.jsx';

const AppRouter = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default AppRouter
