import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logoLogin from '../img/logologin.png'
import './Login.css'

import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (

    <div className="contenedor-login">
        <div className="center text-center">
            <img src= {logoLogin} height="80" width="400" alt="logo" />
            <button className="btn btn-primario btn-block btnLogin" onClick={() => loginWithRedirect()}>Inicia sesión</button>
        </div>
    </div>
  );
};

export default LoginButton;




