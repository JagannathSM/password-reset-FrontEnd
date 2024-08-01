import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Register from "../Register/Register";
import Login from "../Login/Login";
import Home from "../Home/Home";
import PasswordReset from "../PasswordReset/PasswordReset";
import NewPassword from "../NewPassword/NewPassword";
import PrivateRoute from './PrivateRoute';
import GetUser from '../GetUser/GetUser';
import Logout from '../Logout/Logout';

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/password-reset' element={<PasswordReset/>}/>
        <Route path='/password-reset/:passResetToken' element={<NewPassword/>}/>
        <Route element={<PrivateRoute />}>
          <Route path='/user' element={<GetUser/>}/>
          <Route path='/logout' element={<Logout/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default Routing
