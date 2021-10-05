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

import fireDb from '../../firebase';

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
      data: [],
      modalEditar: false,
      modalInsertar: false,
      form:{
        identificacion: "",
        nombre: "",
        email: "",
        password: "",
        rol: "",
        estado: "",
      },
      id: 0
    };

    peticionGet = () => {
      fireDb.child("usuarios").on("value", (usuario) => {
        if (usuario.val() !== null) {
          this.setState({ ...this.state.data, data: usuario.val() });
        } else {
          this.setState({ data: [] });
        }
      });
    };

    peticionPost=()=>{
      fireDb.child("usuarios").push(this.state.form,
        error=>{
          if(error)console.log(error)
        });
        this.setState({modalInsertar: false});
    }

    peticionPut=()=>{
      fireDb.child(`usuarios/${this.state.id}`).set(
        this.state.form,
        error=>{
          if(error)console.log(error)
        });
        this.setState({modalEditar: false});
    }

    peticionDelete=()=>{
      if(window.confirm(`Estás seguro que deseas eliminar el usuario ${this.state.form && this.state.form.identificacion}?`))
      {
        fireDb.child(`usuarios/${this.state.id}`).remove(
        error=>{
          if(error)console.log(error)
        });
      }
    }
  
    handleChange=e=>{
      this.setState({form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }})
      console.log(this.state.form);
    }
  
    seleccionarUsuario=async(usuario, id, caso)=>{
  
      await this.setState({form: usuario, id: id});
  
      (caso==="Editar")?this.setState({modalEditar: true}):
      this.peticionDelete()
  
    }
  
    componentDidMount() {
      this.peticionGet();
    }

    
    render() {
      
      return (
        <>
        <Navigation />
            <>
            <Container className="mt-5 contenedor contenedor-usuarios">
            <h1>Usuarios</h1>
            <br />
              <button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Insertar usuario</button>
                <br />
                <br />
                <Table>

                <thead>
                  <tr>
                    <th>Identificación</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                
                <tbody>
                  {Object.keys(this.state.data).map(i=>{
          
                    return <tr key={i}>
                      <td>{this.state.data[i].identificacion}</td>
                      <td>{this.state.data[i].nombre}</td>
                      <td>{this.state.data[i].email}</td>
                      <td>{this.state.data[i].rol}</td>
                      <td>{this.state.data[i].estado}</td>
                      <td>
                        <button className="btn btn-primary" onClick={()=>this.seleccionarUsuario(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                        <button className="btn btn-danger" onClick={()=>this.seleccionarUsuario(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
                      </td>
                    </tr>
                  })}
                </tbody>

                </Table>
            </Container>

            <Modal className="modal-usuarios" isOpen={this.state.modalInsertar}>

                <ModalHeader>

                <div><h3>Insertar usuario nuevo</h3></div>

                </ModalHeader>
    
                <ModalBody>

                <FormGroup>
                    <label>
                    Identificación: 
                    </label>
                    <input
                    className="form-control"
                    type="text"
                    name="identificacion"
                    onChange={this.handleChange}
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
                    <select className="form-select" name="rol" onChange={this.handleChange}>
                    {optionsRol.map((option) => (
                    <option value={option.value}>{option.label}</option>
                    ))}
                    </select>
                   
                   
                </FormGroup>

                <FormGroup>
                    <label>
                    Estado:
                    </label>
                    <select className="form-select" name="estado" onChange={this.handleChange}>
                    {optionsEstado.map((option) => (
                    <option value={option.value}>{option.label}</option>
                    ))}
                    </select>
                </FormGroup>
              
                </ModalBody>
    
                <ModalFooter>

                <Button
                    color="primary"
                    onClick={()=>this.peticionPost()}
                >
                    Insertar
                </Button>
                <Button
                    className="btn btn-danger"
                    onClick={()=>this.setState({modalInsertar: false})}
                >
                    Cancelar
                </Button>

                </ModalFooter>

            </Modal>


    
            <Modal className="modal-usuarios" isOpen={this.state.modalEditar} >

                <ModalHeader>

                <div><h3>Editar Usuario</h3></div>

                </ModalHeader>
    
                <ModalBody>

                <FormGroup>
                    <label>
                    Identificación:
                    </label>
                    <input
                    className="form-control"
                    name="identificacion"
                    readOnly
                    type="text"
                    onChange={this.handleChange} 
                    value={this.state.form && this.state.form.identificacion}
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
                    value={this.state.form && this.state.form.nombre}
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
                    value={this.state.form && this.state.form.email}
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
                    value={this.state.form && this.state.form.password}
                    
                    />
                </FormGroup>

                <FormGroup>
                    <label>
                    Rol:
                    </label>
                    <select className="form-select" name="rol" value={this.state.form && this.state.form.rol} onChange={this.handleChange}>
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
                    <select className="form-select" name="estado" value={this.state.form && this.state.form.estado} onChange={this.handleChange}>
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
                    onClick={()=>this.peticionPut()}
                >
                    Editar
                </Button>
                <Button
                    color="danger"
                    onClick={()=>this.setState({modalEditar: false})}
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
