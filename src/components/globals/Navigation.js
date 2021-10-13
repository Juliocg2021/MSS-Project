import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Navigation.css'
import logomenu from '../img/logomenu.png'



export default class Navigation extends Component {
    render() {
        return (
            <div className="wrapper">
            <nav>
                <input type="checkbox" id="show-menu" />
                <label htmlFor="show-menu" className="menu-icon"><FontAwesomeIcon icon={faBars} /></label>
                <div className="content">
                    <div className="logo"><img src= {logomenu} alt="logo" /></div>
                    <ul className="links">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/ventas">Ventas</Link></li>
                    <li><Link to="/productos">Productos</Link></li>
                    <li><Link to="/usuarios">Usuarios</Link></li>
                    <li><Link to="/profile">Mi perfil</Link></li>
                    <li><Link to="/logout">Cerrar sesión</Link></li>
                    </ul>
                 </div>
            </nav>
        </div>
        )
    }
}
