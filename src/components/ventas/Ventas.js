import { render } from '@testing-library/react';
import React, { Component } from 'react'

import Navigation from '../globals/Navigation'
import ModalWindow from './Modal.js'
import {
    Button
} from "reactstrap";


function Venta(props){
    const ventas = props.ventas.map(
        (venta, indice) => {
            return(
                <tr key={indice}>
                    <td>{venta.identificador}</td>
                    <td>{venta.valor}</td>
                    <td>{venta.cantidad}</td>
                    <td>{venta.precio}</td>
                    <td>{venta.fecha}</td>
                    <td>{venta.indentificacionCliente}</td>
                    <td>{venta.nombreCliente}</td>
                    <td>{venta.nombreVendedor}</td>
                    <td><Button color="primary" onClick={() => props.editarVenta(indice) } onClick={props.handleShow}  >Editar</Button>
                        {" "}
                        <Button color="danger" onClick={() => props.eliminarVenta(indice)} >Eliminar</Button>
                    </td>
                </tr>
            )
        }
    )
    return ventas
}

const data = [
    { Id_producto: 1001, descripcion: "Taladro percutor 3 pulgadas", valor_unitario: 120000, estado: "Disponible" },
    { Id_producto: 1002, descripcion: "Almadana 3 lb Mango fibra de Vidrio", valor_unitario: 250000, estado: "No_Disponible" },
];

export default class Inicio extends Component {
    constructor(props) {
        super(props);
        this.handleAgregarVenta = this.handleAgregarVenta.bind(this);
        this.eliminarVenta = this.eliminarVenta.bind(this);
        this.editarVenta = this.editarVenta.bind(this);
        this.state = {
            ventas: [
                {
                    identificador: '1',
                    valor: '370000',
                    cantidad: '2',
                    productos: data,
                    fecha: '2021-11-02',
                    identificacionCliente: '10974635142',
                    nombreCliente: 'cliente1',
                    nombreVendedor: 'vendedor1'
                },
            ],
        }
    };

    //agregarVenta = () => { };

    handleAgregarVenta(nuevaVenta) {
        //const ventas = this.state.ventas;
        this.setState({
            ventas: [...this.state.ventas, nuevaVenta]
        });
    }

    //Eliminar una venta

    eliminarVenta(identificador) {
        const ventas = this.state.ventas;
        this.setState({
            ventas: ventas.filter( (venta, indiceMatriz) => {
                return indiceMatriz !== identificador
            })
        });
    }

    editarVenta() {

    }
    handleShow() {
        render() 
        {render (<ModalWindow />)}
    }

    

    render() {
        const ventas = this.state.ventas;

        return (
            <div className="contenedor-app">
                <Navigation />
                <div className="contenedor mt-3">
                    <main>
                        <h1>Ventas</h1>
                        <p>Esta es la lista de ventas</p>
                    </main>
                    <p />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Valor Total</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Fecha</th>
                                <th scope="col"># indentificacion</th>
                                <th scope="col">Nombre Cliente</th>
                                <th scope="col">Nombre del Vendedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Venta  
                            handleShow={this.handleShow} 
                            ventas={ventas} 
                            eliminarVenta={this.eliminarVenta} 
                            editarVenta={this.editarVenta}  />
                        </tbody>
                    </table>
                    <ModalWindow 
                    datosVentas={this.state} 
                    handleAgregarVenta={this.handleAgregarVenta}
                    ventas={this.state.ventas}  />
                </div>
            </div>
        );
    }
}
