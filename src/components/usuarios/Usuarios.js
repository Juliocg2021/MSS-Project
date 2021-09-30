/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import Navigation from '../globals/Navigation'
import './Usuarios.css'
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


//Objeto de usuarios (simulador de base de datos)
const data = [
    { id: 1, nombre: "Jenniffer Monroy", email: "jenniferm@gmail.com", password: "jenniffer123", rol:"Administrador", estado: "Autorizado" },
    { id: 2, nombre: "Julio Gutierrez", email: "juliog@gmail.com", password: "julio123", rol:"Administrador", estado: "Autorizado" },
    { id: 3, nombre: "Yuliana Gaviria", email: "yulianag@gmail.com", password: "yuliana123", rol:"Vendedor", estado: "Autorizado" },
    { id: 4, nombre: "Sebastián Rodríguez", email: "sebastianr@gmail.com", password: "sebas123", rol:"Vendedor", estado: "Autorizado" },
    { id: 5, nombre: "John Edison Cruz", email: "johncruz@gmail.com", password: "john123", rol:"Vendedor", estado: "NoAutorizado" },  
  ];


//Opciones para select de rol
const optionsRol = [
    {
      label: "Administrador",
      value: "Administrador",
    },
    {
      label: "Vendedor",
      value: "Vendedor",
    }
];

//Opciones para select de estado
const optionsEstado = [
    {
        label: "Autorizado",
        value: "Autorizado",
    },
    {
        label: "NoAutorizado",
        value: "NoAutorizado",
    },
    {
        label: "Pendiente",
        value: "Pendiente",
    }
  ]



  class Usuarios extends Component {
    state = {
      data: data,
      modalActualizar: false,
      modalInsertar: false,
      form: {
        id: "",
        nombre: "",
        email: "",
        password: "",
        rol: "",
        estado: "",
      },
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
        if (dato.id === registro.id) {
            arreglo[contador].nombre = dato.nombre;
            arreglo[contador].email = dato.email;
            arreglo[contador].password = dato.password;
            arreglo[contador].rol = dato.rol;
            arreglo[contador].estado = dato.estado;
        }
        contador++;
      }); 
      this.setState({ data: arreglo, modalActualizar: false });
      window.alert("Se ha editado el elemento: "+dato.id);
    };
  
    eliminar = (dato) => {
      var opcion = window.confirm("¿Deseas eliminar el elemento id: "+dato.id+"?");
      if (opcion === true) {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
          if (dato.id === registro.id) {
            arreglo.splice(contador, 1);
          }
          contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
        window.alert("Se ha eliminado el elemento: "+dato.id);
      }
    };
  
    insertar= ()=>{
      var valorNuevo= {...this.state.form};
      valorNuevo.id=this.state.data[data.length - 1].id + 1;
      var lista= this.state.data;
      lista.push(valorNuevo);
      this.setState({ modalInsertar: false, data: lista });
      window.alert("Se ha insertado el elemento: "+valorNuevo.id);
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
        <Navigation />
            <>
            <Container className="mt-5 contenedor contenedor-usuarios">
            <h1>Usuarios</h1>
            <br />
                <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear nuevo</Button>
                <br />
                <br />
                <Table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    </tr>
                </thead>
    
                <tbody>
                    {this.state.data.map((dato) => (
                    <tr key={dato.id}>
                        <td>{dato.id}</td>
                        <td>{dato.nombre}</td>
                        <td>{dato.email}</td>
                        <td>{dato.rol}</td>
                        <td>{dato.estado}</td>
                        <td>
                        <Button
                            color="primary"
                            onClick={() => this.mostrarModalActualizar(dato)}
                        >
                            Editar
                        </Button>{" "}
                        <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </Container>
    
            <Modal className="modal-usuarios" isOpen={this.state.modalActualizar} >
                <ModalHeader>
                <div><h3>Editar Usuario</h3></div>
                </ModalHeader>
    
                <ModalBody>
                <FormGroup>
                    <label>
                    Id:
                    </label>
                    <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={this.state.form.id}
                    />
                </FormGroup>
                
                <FormGroup>
                    <label>
                    Nombre: 
                    </label>
                    <input
                    className="form-control"
                    name="nombre"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.nombre}
                    />
                </FormGroup>

                <FormGroup>
                    <label>
                    Email:
                    </label>
                    <input
                    className="form-control"
                    name="email"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.email}
                    />
                </FormGroup>

                <FormGroup>
                    <label>
                    Password:
                    </label>
                    <input
                    className="form-control"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.form.password}
                    />
                </FormGroup>

                <FormGroup>
                    <label>
                    Rol:
                    </label>
                    <select className="form-select" name="rol" value={this.state.value} onChange={this.handleChange}>
                    <option value={this.state.form.rol}>{this.state.form.rol}</option>
                    {optionsRol.map((option) => (
                    <option value={option.value}>{option.label}</option>
                    ))}
                    </select>
                   
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

    
            <Modal className="modal-usuarios"  isOpen={this.state.modalInsertar}>
                <ModalHeader>
                <div><h3>Insertar Usuario</h3></div>
                </ModalHeader>
    
                <ModalBody>
                <FormGroup>
                    <label>
                    Id: 
                    </label>
                    <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={this.state.data[data.length - 1].id + 1}
                    />
                </FormGroup>
                
                <FormGroup>
                    <label>
                    Nombre: 
                    </label>
                    <input
                    className="form-control"
                    name="nombre"
                    type="text"
                    onChange={this.handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label>
                    Email:
                    </label>
                    <input
                    className="form-control"
                    name="email"
                    type="text"
                    onChange={this.handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label>
                    Password:
                    </label>
                    <input
                    className="form-control"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label>
                    Rol:
                    </label>
                    <select className="form-select" name="rol" value={this.state.value} onChange={this.handleChange}>
                    {optionsRol.map((option) => (
                    <option value={option.value}>{option.label}</option>
                    ))}
                    </select>
                   
                   
                </FormGroup>

                <FormGroup>
                    <label>
                    Estado:
                    </label>
                    <select className="form-select" name="estado" value={this.state.value} onChange={this.handleChange}>
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
        </>
      );
    }
  }
  export default Usuarios;
