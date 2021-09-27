import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logoLogin from '../img/logologin.png'
import './Login.css'

export default class Login extends Component {
    render() {
        return (

            <div className="contenedor-login">
                <div className="center">
                    <img src= {logoLogin} height="80" width="400" alt="logo" />
                    <h1>Iniciar Sesión</h1>

                    <form>
                        <div className="txt_field">
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="txt_field">
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                                required
                            />
                        </div>
                        <div className="pass">Olvidaste tu contraseña?</div>
                        <div className="campo-form">
                            
                            <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión" />
                        
                            <div className ="pt-2 pb-2 text-center"> 
                                <Link to="/">  <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Iniciar sesión con Gmail" /> Iniciar sesión con Gmail </Link>
                            </div>

                        </div>

                    </form>

                </div>
            </div>
        )
    }
}
