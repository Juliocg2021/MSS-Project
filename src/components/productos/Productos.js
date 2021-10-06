/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import Navigation from '../globals/Navigation'
import './Productos.css'
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

import fireDb from '../../firebase';

import MaterialTable from "material-table";


import { forwardRef } from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


const tableIcons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


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
        if(window.confirm(`Estás seguro que deseas eliminar el producto ${this.state.form && this.state.form.id_producto}?`))
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
    
      seleccionarProducto=async(producto, caso)=>{
  
        await this.setState({form: producto, id: producto.id});
    
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
              
              <br />
                <button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Insertar producto</button>
                  <br />
                  <br />

                  <MaterialTable 

                    columns={[
                    { 
                      title: "Id producto", 
                      field: "id_producto"
                    },
                    { 
                      title: "Descripción", 
                      field: "descripcion"
                    },
                    { 
                      title: "Valor unitario", 
                      field: "valor_unitario"
                    },
                    { 
                      title: "Estado", 
                      field: "estado"
                    }
                   
                    
                  ]}
                  data={Object.keys(this.state.data).map(i=>{

                    return {
                      id: i,
                      id_producto: this.state.data[i].id_producto,
                      descripcion: this.state.data[i].descripcion,
                      valor_unitario: this.state.data[i].valor_unitario,
                      estado: this.state.data[i].estado
  
                      
                    }
    
                  
                  
                  })}
                  title="Lista de productos"  
                  icons={tableIcons}
                  actions={[
                    {
                      icon: EditIcon,
                      tooltip: 'Editar producto',
                      onClick: (event, rowData) => this.seleccionarProducto(rowData, "Editar")
                    },
                    {
                      icon: DeleteIcon,
                      tooltip: 'Eliminar producto',
                      onClick: (event, rowData) => this.seleccionarProducto(rowData, "Eliminar")
                    }
                  ]}
                  options={{
                    actionsColumnIndex: -1,
                    pageSize: 5,
                    pageSizeOptions: [5, 10, 20, 30, 40, 50],
                    search: true,
                    paging: true,
                    sorting: true,
                    cellStyle : {
                      padding: "4px",
                      border: "1px solid #e1e1e1",
                      fontSize: "14px"
                    },
                    headerStyle: {
                      backgroundColor: '#01579b',
                      fontSize: "12px",
                      color: '#FFF',
                      padding: "8px"
                    },
                    searchFieldStyle: {
                      fontSize: "14px"
                    }
                    
                
                  }}
                  localization={{
                    header:{
                      actions: "Acciones"
                    }
                  }}

	            />
                  
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
                      type="number"
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
                      type="number"
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