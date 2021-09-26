import React, { Component } from 'react'

import Navigation from '../globals/Navigation'




export default class Inicio extends Component {
    render() {
        return (
            
            <div className="contenedor-app">
                <Navigation />
            <div className="contenedor mt-3">
                <main>
                    <h1>Ventas</h1>
                    <p>Esta es la lista de ventas</p>
                </main>
            </div>
        </div>

        );
           
        
    }
}
