import React, { Component } from 'react'
import Navigation from '../globals/Navigation'
import './Ventas.css'
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
        idventa: "",
        fecha: "",
        encargado: "",
        idcliente: "",
        nombrecliente: "",
        listaproductos: "",
        totalventa: "",
        estado: "" 
      },
      id:0
    };
  
      peticionGet = () => {
        fireDb.child("ventas").on("value", (venta) => {
          if (venta.val() !== null) {
            this.setState({ ...this.state.data, data: venta.val() });
          } else {
            this.setState({ data: [] });
          }
        });
      };
  
      peticionPost=()=>{
        fireDb.child("ventas").push(this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalInsertar: false});
      }
  
      peticionPut=()=>{
        fireDb.child(`ventas/${this.state.id}`).set(
          this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalEditar: false});
      }
  
      peticionDelete=()=>{
        if(window.confirm(`Estás seguro que deseas eliminar la venta ${this.state.form && this.state.form.idventa}?`))
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
    
      seleccionarVenta=async(venta, caso)=>{
  
        await this.setState({form: venta, id: venta.id});
    
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
              <br />
                <button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Insertar Nueva Venta</button>
                  <br />
                  <br />

                  <MaterialTable 

                    columns={[
                    { 
                      title: "Id venta", 
                      field: "idventa"
                    }
                    ,
                    {
                      title: "Fecha",
                      field: "fecha"
                    },
                    {
                      title: "Encargado",
                      field: "encargado"
                    },
                    {
                      title: "Id cliente",
                      field: "idcliente"
                    },

                    {
                      title: "Nombre cliente",
                      field: "nombrecliente"
                    },
                    {
                      title: "Total",
                      field: "totalventa"
                    },
                    {
                      title: "Estado",
                      field: "estado"
                    }
                
                    
                  ]}
                  data={Object.keys(this.state.data).map(i=>{

                    return {
                      id: i,
                      idventa: this.state.data[i].idventa,
                      fecha: this.state.data[i].fecha,
                      encargado: this.state.data[i].encargado,
                      idcliente: this.state.data[i].idcliente,
                      nombrecliente: this.state.data[i].nombrecliente,
                      listaproductos: this.state.data[i].listaproductos,
                      totalventa: this.state.data[i].totalventa,
                      estado: this.state.data[i].estado
                    }
    
          
                  })}
                  title="Lista de ventas"  
                  icons={tableIcons}
                  actions={[
                    {
                      icon: EditIcon,
                      tooltip: 'Editar venta',
                      onClick: (event, rowData) => this.seleccionarVenta(rowData, "Editar")
                    },
                    {
                      icon: DeleteIcon,
                      tooltip: 'Eliminar venta',
                      onClick: (event, rowData) => this.seleccionarVenta(rowData, "Eliminar")
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
                      name="idventa"
                      onChange={this.handleChange}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Fecha.Venta:
                      </label>
                      <input
                      className="form-control"
                      name="fecha"
                      type={'date'}
                      onChange={this.handleChange}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Encargado:
                      </label>
                      <input
                      className="form-control"
                      name="encargado"
                      type="text"
                      onChange={this.handleChange}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Id.Cliente:
                      </label>
                      <input
                      className="form-control"
                      name="idcliente"
                      type="number"
                      onChange={this.handleChange}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Nombre.Cliente</label>
                      <input
                      className="form-control"
                      name="nombrecliente"
                      type="text"
                      onChange={this.handleChange}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Lista.Productos</label>
                      <textarea
                      className="form-control"
                      name="listaproductos"
                      type="textarea"
                      rows="5"
                      onChange={this.handleChange}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Total Venta:
                      </label>
                      <input
                      className="form-control"
                      name="totalventa"
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
                      name="idventa"
                      readOnly
                      type="number"
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.idventa}
                      />
                  </FormGroup>
        

                  <FormGroup>
                      <label>
                      Fecha.Venta:
                      </label>
                      <input
                      className="form-control"
                      name="fecha"
                      type={'date'}
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.fecha}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Encargado:
                      </label>
                      <input
                      className="form-control"
                      name="encargado"
                      type="text"
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.encargado}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Id.Cliente:
                      </label>
                      <input
                      className="form-control"
                      name="idcliente"
                      type="number"
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.idcliente}
                      />
                  </FormGroup>
 
                  <FormGroup>
                      <label>
                      Nombre.Cliente:
                      </label>
                      <input
                      className="form-control"
                      name="nombrecliente"
                      type="text"
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.nombrecliente}
                      />
                  </FormGroup>

                  <FormGroup>
                      <label>
                      Lista.Productos:
                      </label>
                      <textarea
                      className="form-control"
                      name="listaproductos"
                      rows="5"
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.listaproductos}
                      />
                  </FormGroup>
            

                  <FormGroup>
                      <label>
                      Total Venta:
                      </label>
                      <input
                      className="form-control"
                      name="totalventa"
                      type="number"
                      onChange={this.handleChange} 
                      value={this.state.form && this.state.form.totalventa}
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