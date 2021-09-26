import React, { Component } from 'react'

import Navigation from '../globals/Navigation'


export default class Inicio extends Component {
    render() {
        return (
            
            <div className="contenedor-app">
                <Navigation />
            <div className="contenedor mt-3">
                <main>
                    <h1>Productos</h1>
                </main>
            </div>
        </div>

        );
           
        
    }
}
