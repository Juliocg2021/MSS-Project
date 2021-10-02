import React, { Component } from 'react'
import './Productos.css'
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";


//onClick={}
function BotonCrearNuevo(props) {
    if (props.estoyEnVentas) {
        return (<></>);
    }
    return (
        <Button color="success" onClick={() => props.mostrarModalInsertar()}>Crear Nuevo</Button>
    );
}

function BotonesEditarYEliminar(props) {
    if (props.estoyEnVentas) {
        return (
        <Button color="primary" onClick={() => props.handleAgregarProducto(props.productos)} >
            Agregar
        </Button>
        );
    }
    return (
        <>
            <Button color="primary" onClick={() => props.mostrarModalActualizar(props.dato)}>
                Editar
            </Button>
            {" "}
            <Button color="danger" onClick={() => props.eliminar(props.dato)}>
                Eliminar
            </Button>
        </>
    );
}




//Objeto de productos (simulador de base de datos)
const data = [
    { Id_producto: 1001, descripcion: "Taladro percutor 3 pulgadas", valor_unitario: 120000, estado: "Disponible" },
    { Id_producto: 1002, descripcion: "Almadana 3 lb Mango fibra de Vidrio", valor_unitario: 250000, estado: "No_Disponible" },
];

const optionsEstado = [
    {
        label: "Disponible",
        value: "Disponible",
    },
    {
        label: "No_Disponible",
        value: "No_Disponible",
    }
];


export default class productos extends Component {
    constructor(props){
        super(props);
    }

    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            Id_producto: "",
            descripcion: "",
            valor_unitario: 0,
            estado: "",
        }
    };

    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;

        arreglo.map((registro) => {
            if (dato.Id_producto === registro.Id_producto) {
                arreglo[contador].descripcion = dato.descripcion;
                arreglo[contador].valor_unitario = dato.valor_unitario;
                arreglo[contador].estado = dato.estado;
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
        window.alert("Se ha editado el producto con Codigo: " + dato.Id_producto);
    };

    eliminar = (dato) => {
        var opcion = window.confirm("¿Deseas eliminar el producto con Codigo: " + dato.Id_producto + "?");
        if (opcion === true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.Id_producto === registro.Id_producto) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo, modalActualizar: false });
            window.alert("Se ha eliminado el producto con Codigo: " + dato.Id_producto);
        }
    };

    insertar = () => {
        var valorNuevo = { ...this.state.form };
        valorNuevo.Id_producto = this.state.data[data.length - 1].Id_producto + 1;
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
        window.alert("Se ha insertado el producto con Codigo: " + valorNuevo.Id_producto);
    }

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    render() {
        return (
            <>
                <Container className="mt-5 contenedor contenedor-productos">
                    <h1>Productos</h1>
                    <br />
                    <BotonCrearNuevo 
                    estoyEnVentas={this.props.estoyEnVentas} 
                    mostrarModalInsertar={this.mostrarModalInsertar} />
                    <Table>
                        <thead>
                            <tr>
                                <th>Id_Producto</th>
                                <th>Descripcion</th>
                                <th>Valor_Unitario</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data.map((dato) => (
                                <tr key={dato.Id_producto}>
                                    <td>{dato.Id_producto}</td>
                                    <td>{dato.descripcion}</td>
                                    <td>{dato.valor_unitario}</td>
                                    <td>{dato.estado}</td>
                                    <td>
                                        <BotonesEditarYEliminar 
                                        agregarProducto={this.props.handleAgregarProducto} 
                                        eliminarProducto={this.props.handleAgregarProducto}
                                        eliminar={this.eliminar}
                                        productos={this.props.productos} 
                                        mostrarModalActualizar={this.mostrarModalActualizar} 
                                        estoyEnVentas={this.props.estoyEnVentas} dato={dato} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>

                <Modal className="modal-productos" isOpen={this.state.modalActualizar} >
                    <ModalHeader>
                        <div><h3>Editar producto</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>
                                Id_Producto:
                            </label>
                            <input
                                className="form-control"
                                readOnly
                                type={Number}
                                value={this.state.form.Id_producto}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Descripcion:
                            </label>
                            <input
                                className="form-control"
                                name="descripcion"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.descripcion}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Valor_Unitario:
                            </label>
                            <input
                                className="form-control"
                                name="valor_unitario"
                                type={Number}
                                onChange={this.handleChange}
                                value={this.state.form.valor_unitario}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Estado:
                            </label>
                            <select className="form-select" name="estado" value={this.state.value} onChange={this.handleChange}>
                                <option value={this.state.form.estado}>{this.state.form.estado}</option>
                                {optionsEstado.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.editar(this.state.form)}
                        >
                            Editar
                        </Button>
                        <Button
                            color="danger"
                            onClick={() => this.cerrarModalActualizar()}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>


                <Modal className="modal-productos" isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Insertar producto</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>
                                Id_Producto:
                            </label>
                            <input
                                className="form-control"
                                readOnly
                                type={Number}
                                value={this.state.data[data.length - 1].Id_producto + 1}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Descripcion:
                            </label>
                            <input
                                className="form-control"
                                name="descripcion"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Valor_unitario:
                            </label>
                            <input
                                className="form-control"
                                name="valor_unitario"
                                type={Number}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Estado:
                            </label>
                            <select className="form-select" name="rol" value={this.state.value} onChange={this.handleChange}>
                                {optionsEstado.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.insertar()}
                        >
                            Insertar
                        </Button>
                        <Button
                            className="btn btn-danger"
                            onClick={() => this.cerrarModalInsertar()}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}
