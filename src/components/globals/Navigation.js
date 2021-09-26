import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

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
                    <div className="logo"><a href="index.html"><img src= {logomenu} alt="logo" /></a></div>
                    <ul className="links">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/ventas">Ventas</Link></li>
                    <li><Link to="/productos">Productos</Link></li>
                    <li><Link to="/usuarios">Usuarios</Link></li>
                    <li><Link to="/login"><FontAwesomeIcon icon={faSignInAlt} /></Link></li>
                    </ul>
                 </div>
                <input type="checkbox" id="show-search" />
                <label htmlFor="show-search" className="search-icon"><FontAwesomeIcon icon={faSearch} /></label>
                <form action="#" className="search-box">
                    <input type="text" placeholder="Escriba lo que desea buscar..." required />
                    <button type="submit" className="go-icon"><FontAwesomeIcon icon={faArrowRight} /></button>
                </form>
            </nav>
        </div>
        )
    }
}
