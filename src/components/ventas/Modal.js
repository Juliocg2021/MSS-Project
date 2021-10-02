import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import ProductosAgg from './ProductosAgg.js';
import ListaProductos from '../productos/ListaProductos.js';



export default class ModalWindow extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleAgregarProducto = this.handleAgregarProducto.bind(this);
        this.handleEliminarProducto = this.handleEliminarProducto.bind(this);
        this.handleValor = this.handleValor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            show: false,
            identificador: '',
            valor: 0,
            cantidad: 0,
            productos: [{
                Id_producto: '',
                descripcion: '',
                valor_unitario: 0,
                estado: ''
            }
            ],
            fecha: '',
            identificacionCliente: '',
            nombreCliente: '',
            nombreVendedor: ''
        }
    }

    handleChange(evento) {
        const nombre = evento.target.name;
        const valor = evento.target.value;
        this.setState({
            [nombre]: valor,
        });
    }

    handleClose() {
        this.setState({
            show: false
        });
    }

    handleShow() {
        this.setState({
            show: true
        });
    }

    handleValor(productos) {
        var total = 0;
        for (var i = 0; i < productos.length; i++) {
            total += productos[i].valor_unitario
        }
        this.setState({
            valor: total
        });
    }

    handleAgregarProducto(productoNuevo) {
        this.setState({
            productos: [...this.state.productos, productoNuevo],
            cantidad: this.state.cantidad + 1
        });
    }

    handleEliminarProducto(productoId) {
        const productos = this.state.productos;
        this.setState({
            productos: productos.filter(
                (producto, i) => {
                    return i !== productoId
                }
            ),
            cantidad: this.state.cantidad - 1
        });
    }

    handleSubmit(){
        this.props.handleAgregarVenta(this.state)
        this.setState({
            show: false,
            identificador: '',
            valor: 0,
            cantidad: 0,
            productos: [{
                Id_producto: '',
                descripcion: '',
                valor_unitario: 0,
                estado: ''
            }
            ],
            fecha: '',
            identificacionCliente: '',
            nombreCliente: '',
            nombreVendedor: ''
        });
    }

    render() {
        //const [show, setShow] = useState(false);
        const identificador = this.state.identificador;
        const valor = this.state.valor;
        const cantidad = this.state.cantidad;
        const fecha = this.state.fecha;
        const identificacionCliente = this.state.identificacionCliente;
        const nombreCliente = this.state.nombreCliente;
        const nombreVendedor = this.state.nombreVendedor;
        return (
            <>
                <Modal fullscreen={true} show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ingresar Nueva Venta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Id venta:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="identificador"
                                    id="identificador"
                                    placeholder="id"
                                    value={identificador}
                                    onChange={this.handleChange} />
                            </Form.Group>

                            <p />
                            <Form.Group>
                                <label for="recipient-name" class="col-form-label">Responsable: </label>
                                <select name="editarresponsable" id="responsable">
                                    <option value="">Selecciona una opción</option>
                                    <option value="">Jennifer Monroy</option>
                                    <option value="">Yuliana Gaviria</option>
                                    <option value="">Jhon Edinson Cruz</option>
                                    <option value="">Juan Sebastian Rodriguez</option>
                                    <option value="">Julio Cesar Gutierrez</option>
                                </select>
                            </Form.Group>
                            <p />

                            <Form.Group>
                                <Form.Label>Fecha:</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fecha"
                                    id="fecha"
                                    value={fecha}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Nombre del Cliente:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombreCliente"
                                    id="nombreCliente"
                                    placeholder="Escriba el nombre del cliente..."
                                    value={nombreCliente}
                                    onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label># indentificacion:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="identificacionCliente"
                                    id="identificacionCliente"
                                    placeholder="Escriba el numero de idenficacion del cliente..."
                                    value={identificacionCliente}
                                    onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Cantidad:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="cantidad"
                                    id="cantidad"
                                    readOnly
                                    value={cantidad}
                                    onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <ListaProductos
                                    productos={this.state.productos}
                                    estoyEnVentas={true}
                                    handleAgregarProducto={this.handleAgregarProducto}
                                    handleEliminarProducto={this.handleEliminarProducto} />
                            </Form.Group>

                            <Form.Group>
                                <ProductosAgg
                                    productos={this.state.productos}
                                    estoyEnVentas={true}
                                    handleAgregarProducto={this.handleAgregarProducto}
                                    handleEliminarProducto={this.handleEliminarProducto} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Valor Total:</Form.Label>
                                <Form.Control 
                                type="number" 
                                name="valor"
                                readOnly 
                                value={valor} />
                            </Form.Group>
                            <p />

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <label for="recipient-name" class="col-form-label">Estado de la venta: </label>
                                <select name="editarEstadoVenta" id="editarEstadoVenta">
                                    <option value="">Selecciona una opción</option>
                                    <option value="">Creación</option>
                                    <option value="">Embalaje</option>
                                    <option value="">Despacho</option>
                                    <option value="">Recepción</option>
                                    <option value="">Ubicación</option>
                                    <option value="">Completada</option>
                                </select>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={this.handleClose} onClick={this.handleSubmit}>
                            Guardar cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


