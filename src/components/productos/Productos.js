/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import Navigation from '../globals/Navigation'
import './Productos.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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

//Opciones para select de estado
const optionsEstado = [
    {
        label: "Disponible",
        value: "Disponible",
    },
    {
        label: "No_Disponible",
        value: "No_Disponible",
    }
  ]

class Productos extends Component {
    state = {
      data: [],
      modalEditar: false,
      modalInsertar: false,
      form: {
        id_producto: "",
        descripcion: "",
        valor_unitario: "",
        estado: "",
      },
      id:0
    };
  
      peticionGet = () => {
        fireDb.child("productos").on("value", (producto) => {
          if (producto.val() !== null) {
            this.setState({ ...this.state.data, data: producto.val() });
          } else {
            this.setState({ data: [] });
          }
        });
      };
  
      peticionPost=()=>{
        fireDb.child("productos").push(this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalInsertar: false});
      }
  
      peticionPut=()=>{
        fireDb.child(`productos/${this.state.id}`).set(
          this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalEditar: false});
      }
  
      peticionDelete=()=>{
        if(window.confirm(`Estás seguro que deseas eliminar el producto ${this.state.form && this.state.form.canal}?`))
        {
          fireDb.child(`productos/${this.state.id}`).remove(
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
    
      seleccionarproducto=async(producto, id, caso)=>{
    
        await this.setState({form: producto, id: id});
    
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
              <Container className="mt-5 contenedor contenedor-productos">
              <h1>Productos</h1>
              <div className="barraBusqueda">
                        <input
                        type="text"
                        placeholder="Buscar"
                        className="textField"
                        name="busqueda"
                        />
                        <button type="button" className="btnBuscar" /*onClick=*/>
                        {" "}
                        <FontAwesomeIcon icon={faSearch} />
                        </button>
              </div>
              <br />
                <button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Insertar producto</button>
                  <br />
                  <br />
                  <Table>
  
                  <thead>
                    <tr>
                      <th>Id.Producto</th>
                      <th>Descripcion</th>
                      <th>Valor Unitario</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {Object.keys(this.state.data).map(i=>{
            
                      return <tr key={i}>
                        <td>{this.state.data[i].id_producto}</td>
                        <td>{this.state.data[i].descripcion}</td>
                        <td>{this.state.data[i].valor_unitario}</td>
                        <td>{this.state.data[i].estado}</td>
                        <td>
                          <button className="btn btn-primary" onClick={()=>this.seleccionarproducto(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                          <button className="btn btn-danger" onClick={()=>this.seleccionarproducto(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
                        </td>
                      </tr>
                    })}
                  </tbody>
  
                  </Table>
              </Container>
  
              <Modal className="modal-productos" isOpen={this.state.modalInsertar}>
  
                  <ModalHeader>
  
                  <div><h3>Insertar producto nuevo</h3></div>
  
                  </ModalHeader>
      
                  <ModalBody>
  
                  <FormGroup>
                      <label>
                      Id.Producto: 
                      </label>
                      <input
                      className="form-control"
                      type={Number}
                      name="id_producto"
                      onChange={this.handleChange}
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
                      Valor Unitario:
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
  
  
      
              <Modal className="modal-productos" isOpen={this.state.modalEditar} >
  
                  <ModalHeader>
  
                  <div><h3>Editar producto</h3></div>
  
                  </ModalHeader>
      
                  <ModalBody>
  
                  <FormGroup>
                      <label>
                      Id.Producto:
                      </label>
                      <input
                      className="form-control"
                      name="id_producto"
                      readOnly
                      type={Number}
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.id_producto}
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
                      value={this.state.form && this.state.form.descripcion}
                      />
                  </FormGroup>
  
                  <FormGroup>
                      <label>
                      Valor Unitario:
                      </label>
                      <input
                      className="form-control"
                      name="valor_unitario"
                      type={Number}
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.valor_unitario}
                      />
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
    export default Productos;