import { render } from '@testing-library/react';
import React, { Component } from 'react'

import Navigation from '../globals/Navigation'
import ModalWindow from './Modal.js'
import {
    Button
} from "reactstrap";


function Venta(props) {
    const ventas = props.ventas.map(
        (venta, indice) => {
            return (
                <tr key={indice}>
                    <td>{venta.identificador}</td>
                    <td>{venta.valor}</td>
                    <td>{venta.fecha}</td>
                    <td>{venta.identificacionCliente}</td>
                    <td>{venta.nombreCliente}</td>
                    <td>{venta.nombreVendedor}</td>
                    <td>{venta.estadoVenta}</td>
                    <td><Button color="primary" onClick={() => props.handleShowEditar(indice)} >Editar</Button>
                        {" "}
                        <Button color="danger" onClick={() => props.eliminarVenta(indice)} >Eliminar</Button>
                    </td>
                </tr>
            )
        }
    )
    return ventas
}

const data1 = [
    { idProducto: 1045, descripcion: "Taladro percutor 3 pulgadas", valor_unitario: 12000, cantidad: '2' },
    { idProducto: 1012, descripcion: "Almadana 3 lb Mango fibra de Vidrio", valor_unitario: 250000, cantidad: '5', },
];

const data2 = [
    { idProducto: 1078, descripcion: "Martillo", valor_unitario: 45000, cantidad: '5' },
    { idProducto: 1056, descripcion: "Pulidora", valor_unitario: 120000, cantidad: '8', },
];

const data3 = [
    { idProducto: 1045, descripcion: "Pala", valor_unitario: 67000, cantidad: '2' },
    { idProducto: 1034, descripcion: "Destornillador", valor_unitario: 123000, cantidad: '4', },
];

export default class Inicio extends Component {
    constructor(props) {
        super(props);
        this.handleAgregarVenta = this.handleAgregarVenta.bind(this);
        this.eliminarVenta = this.eliminarVenta.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShowEditar = this.handleShowEditar.bind(this);
        this.limpiarModal = this.limpiarModal.bind(this);
        this.agregarNuevaVenta = this.agregarNuevaVenta.bind(this);
        this.state = {
            ventas: [
                {
                    identificador: '1',
                    valor: '120000',
                    productos: data1,
                    fecha: '2021-11-02',
                    identificacionCliente: '10974635142',
                    nombreCliente: 'cliente1',
                    nombreVendedor: 'Juan Sebastian Rodriguez',
                    estadoVenta: 'Embalaje',

                },
                {
                    identificador: '2',
                    valor: '230000',
                    productos: data2,
                    fecha: '2021-03-02',
                    identificacionCliente: '1234635142',
                    nombreCliente: 'cliente2',
                    nombreVendedor: 'Jhon Edinson Cruz',
                    estadoVenta: 'Despacho',
                },
                {
                    identificador: '3',
                    valor: '430000',
                    productos: data3,
                    fecha: '2021-10-02',
                    identificacionCliente: '1093145142',
                    nombreCliente: 'sandra',
                    nombreVendedor: 'Yuliana Gaviria',
                    estadoVenta: 'Embalaje',

                },
                {
                    identificador: '4',
                    valor: '870000',
                    productos: data2,
                    fecha: '2020-06-02',
                    identificacionCliente: '10912354142',
                    nombreCliente: 'cliente4',
                    nombreVendedor: 'Jennifer Monroy',
                    estadoVenta: 'Despacho',

                },
                {
                    identificador: '5',
                    valor: '760000',
                    productos: data3,
                    fecha: '2020-04-02',
                    identificacionCliente: '11235142',
                    nombreCliente: 'cliente5',
                    nombreVendedor: 'Jennifer Monroy',
                    estadoVenta: 'Despacho',

                },
            ],
            show: false,
            ventaEditar: {
                identificador: '',
                valor: 0,
                productos: [{
                    idProducto: '',
                    descripcion: '',
                    valor_unitario: 0,
                    cantidad: 0
                }
                ],
                fecha: '',
                identificacionCliente: '',
                nombreCliente: '',
                nombreVendedor: '',
                estadoVenta: '',
            }

        }
    };
    //agregarVenta = () => { };

    handleAgregarVenta() {
        //const ventas = this.state.ventas;
        this.setState({
            ventas: [...this.state.ventas, this.state.ventaEditar]
        });
    }

    //Eliminar una venta

    eliminarVenta(identificador) {
        const ventas = this.state.ventas;
        this.setState({
            ventas: ventas.filter((venta, indiceMatriz) => {
                return indiceMatriz !== identificador
            })
        });
    }

    agregarNuevaVenta(evento){
        const nombre = evento.target.name;
        const valor = evento.target.value;
        console.log("NOMBRE: " + nombre + " VALOR: " + valor)
        this.setState({
            ventaEditar: {
                [nombre]: valor,
            }
        });
    }


    limpiarModal() {
        this.setState({
            ventaEditar: {
                identificador: '',
                valor: 0,
                productos: [{
                    idProducto: '',
                    descripcion: '',
                    valor_unitario: 0,
                    cantidad: 0
                }
                ],
                fecha: '',
                identificacionCliente: '',
                nombreCliente: '',
                nombreVendedor: '',
                estadoVenta: '',
            }
        })
    }


    handleShowEditar = (indice) => {
        const ventass = this.state.ventas

        for (var i = 0; i < ventass.length; i++) {
            if (i === indice) {
                this.setState({
                    ventaEditar: {
                        identificador: ventass[i].identificador,
                        valor: ventass[i].valor,
                        productos: ventass[i].productos,
                        fecha: ventass[i].fecha,
                        identificacionCliente: ventass[i].identificacionCliente,
                        nombreCliente: ventass[i].nombreCliente,
                        nombreVendedor: ventass[i].nombreVendedor,
                        estadoVenta: ventass[i].estadoVenta,
                    },
                    show: true

                });
                break;
            }
        }

    }

    handleShow() {
        this.limpiarModal();
        this.setState({
            show: true
        });
    }

    handleClose() {
        this.setState({
            show: false
        });
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
                                <th scope="col">Fecha</th>
                                <th scope="col"># identificacion del Cliente</th>
                                <th scope="col">Nombre Cliente</th>
                                <th scope="col">Nombre del Vendedor</th>
                                <th scope="col">Estado de Venta</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Venta
                                handleShow={this.handleShow}
                                handleShowEditar={this.handleShowEditar}
                                ventas={ventas}
                                eliminarVenta={this.eliminarVenta}
                                editarVenta={this.editarVenta} />
                        </tbody>
                    </table>
                    <Button variant="primary" onClick={this.handleShow}>
                        + Nueva venta
                    </Button>
                    <ModalWindow
                    agregarNuevaVenta={this.agregarNuevaVenta}
                        limpiarModal={this.limpiarModal}
                        ventaEditar={this.state.ventaEditar}
                        handleShowEditar={this.handleShowEditar}
                        ventaModificar={this.ventaModificar}
                        datosVentas={this.state.ventas}
                        handleAgregarVenta={this.handleAgregarVenta}
                        ventas={this.state.ventas}
                        show={this.state.show}
                        handleClose={this.handleClose}
                    />
                </div>
            </div>
        );
    }
}
