import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LogInRegister from '../../pages/LogInRegister/LogInRegister.jsx';

const AppRouter = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<LogInRegister />} />
      </Routes>
    </>
  )
}

export default AppRouter
