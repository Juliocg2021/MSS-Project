import React, { Component } from 'react'
import Navigation from '../globals/Navigation'
import './Ventas.css'
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
        label: "En Proceso",
        value: "En Proceso",
    },
    {
        label: "Cancelada",
        value: "Cancelada",
    },
    {
    label: "Entregada",
    value: "Entregada",
    }
  ]

class Ventas extends Component {
    state = {
      data: [],
      modalEditar: false,
      modalInsertar: false,
      form: {
        id_venta: "",
        id_producto: "",
        descripcion: "",      
        cantidad:"",
        valor_unitario: "",
        fecha_venta: "",
        id_cliente: "",
        nombre_cliente:"",
        valor_total_venta: "",
        usuario: "",
        estado: "",
      },
      id:0
    };
  
      peticionGet = () => {
        fireDb.child("Ventas").on("value", (venta) => {
          if (venta.val() !== null) {
            this.setState({ ...this.state.data, data: venta.val() });
          } else {
            this.setState({ data: [] });
          }
        });
      };
  
      peticionPost=()=>{
        fireDb.child("Ventas").push(this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalInsertar: false});
      }
  
      peticionPut=()=>{
        fireDb.child(`Ventas/${this.state.id}`).set(
          this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalEditar: false});
      }
  
      peticionDelete=()=>{
        if(window.confirm(`Estás seguro que deseas eliminar la venta ${this.state.form && this.state.form.id_venta}?`))
        {
          fireDb.child(`Ventas/${this.state.id}`).remove(
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
              <Container className="mt-5 contenedor contenedor-Ventas">
              <h1>Ventas</h1>
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
                <button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Insertar Nueva Venta</button>
                  <br />
                  <br />
                  <Table>
  
                  <thead>
                    <tr>
                      <th>Id.Venta</th>
                      <th>Id.Producto</th>
                      <th>Descripcion</th>
                      <th>Cantidad</th>
                      <th>Valor Unitario</th>
                      <th>Fecha Venta</th>
                      <th>Id.Cliente</th>
                      <th>Nombre Cliente</th>
                      <th>Valor Total Venta</th>                      
                      <th>Usuario</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {Object.keys(this.state.data).map(i=>{
            
                      return <tr key={i}>
                        <td>{this.state.data[i].id_venta}</td>
                        <td>{this.state.data[i].id_producto}</td>
                        <td>{this.state.data[i].descripcion}</td>
                        <td>{this.state.data[i].cantidad}</td>
                        <td>{this.state.data[i].valor_unitario}</td>
                        <td>{this.state.data[i].fecha_venta}</td>
                        <td>{this.state.data[i].id_cliente}</td>
                        <td>{this.state.data[i].nombre_cliente}</td>
                        <td>{this.state.data[i].valor_total_venta}</td>
                        <td>{this.state.data[i].usuario}</td>
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
  
              <Modal className="modal-Ventas" isOpen={this.state.modalInsertar}>
  
                  <ModalHeader>
  
                  <div><h3>Insertar Nueva Venta</h3></div>
  
                  </ModalHeader>
      
                  <ModalBody>
  
                  <FormGroup>
                      <label>
                      Id.Venta: 
                      </label>
                      <input
                      className="form-control"
                      type="number"
                      name="id_venta"
                      onChange={this.handleChange}
                      />
                  </FormGroup>
                  
                  <FormGroup>
                      <label>
                      Id.Producto: 
                      </label>
                      <input
                      className="form-control"
                      name="id_Producto"
                      type="number"
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
                      Cantidad:
                      </label>
                      <input
                      className="form-control"
                      name="cantidad"
                      type="number"
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
                      type="number"
                      onChange={this.handleChange}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Fecha Venta:
                      </label>
                      <input
                      className="form-control"
                      name="fecha_venta"
                      type={'date'}
                      onChange={this.handleChange}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Id.Cliente:
                      </label>
                      <input
                      className="form-control"
                      name="id_cliente"
                      type="number"
                      onChange={this.handleChange}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Nombre Cliente</label>
                      <input
                      className="form-control"
                      name="nombre_cliente"
                      type="text"
                      onChange={this.handleChange}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Valor Total Venta:
                      </label>
                      <input
                      className="form-control"
                      name="valor_total_venta"
                      type="number"
                      onChange={this.handleChange}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Usuario:
                      </label>
                      <input
                      className="form-control"
                      name="usuario"
                      type="text"
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
  
  
      
              <Modal className="modal-Ventas" isOpen={this.state.modalEditar} >
  
                  <ModalHeader>
  
                  <div><h3>Editar Venta</h3></div>
  
                  </ModalHeader>
      
                  <ModalBody>
  
                  <FormGroup>
                      <label>
                      Id.Venta:
                      </label>
                      <input
                      className="form-control"
                      name="id_venta"
                      readOnly
                      type="number"
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.id_venta}
                      />
                  </FormGroup>
                  
                  <FormGroup>
                      <label>
                      Id.Producto: 
                      </label>
                      <input
                      className="form-control"
                      name="id_producto"
                      type="number"
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
                      Cantidad:
                      </label>
                      <input
                      className="form-control"
                      name="cantidad"
                      type="number"
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.cantidad}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Valor Unitario:
                      </label>
                      <input
                      className="form-control"
                      name="valor_unitario"
                      type="number"
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.valor_unitario}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Fecha Venta:
                      </label>
                      <input
                      className="form-control"
                      name="fecha_venta"
                      type={'date'}
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.fecha_venta}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Id.Cliente:
                      </label>
                      <input
                      className="form-control"
                      name="id_cliente"
                      type="number"
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.id_cliente}
                      />
                  </FormGroup>
 
                  <FormGroup>
                      <label>
                      Nombre Cliente:
                      </label>
                      <input
                      className="form-control"
                      name="nombre_cliente"
                      type="text"
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.nombre_cliente}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Valor Total Venta:
                      </label>
                      <input
                      className="form-control"
                      name="valor_total_venta"
                      type="number"
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.valor_total_venta}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Usuario:
                      </label>
                      <input
                      className="form-control"
                      name="usuario"
                      type="text"
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.usuario}
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
    export default Ventas;