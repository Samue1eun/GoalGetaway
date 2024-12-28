import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import LogInRegister from '../../pages/LogIn/LogIn.jsx';
import LogIn from '../../pages/LogIn/LogIn.jsx';
import Register from '../../pages/Register/Register.jsx';

const AppRouter = () => {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/" element={<Landing />} /> */}
      </Routes>
    </>
  )
}

export default AppRouter
