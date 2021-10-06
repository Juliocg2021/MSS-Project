/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import Navigation from '../globals/Navigation'
import './Usuarios.css'
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
  
    seleccionarUsuario=async(usuario, caso)=>{
  
      await this.setState({form: usuario, id: usuario.id});
  
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

                <MaterialTable 

	              columns={[
	              { 
	                title: "Identificacion", 
	                field: "identificacion"
	              },
	              { 
	                title: "Nombre",
	                field: "nombre" 
	              }, 
                {
                  title: "Email",
                  field: "email"
                },  
                {
                  title: "Rol",
                  field: "rol"
                },
                {
                  title: "Estado",
                  field: "estado"
                }
	              
	            ]}
	            data={Object.keys(this.state.data).map(i=>{

                return {
                  id: i,
                  identificacion: this.state.data[i].identificacion,
                  nombre: this.state.data[i].nombre,
                  email: this.state.data[i].email,
                  password: this.state.data[i].password,
                  rol: this.state.data[i].rol,
                  estado: this.state.data[i].estado
                }
 
              
               
              })}
              title="Lista de usuarios"  
              icons={tableIcons}
              actions={[
                {
                  icon: EditIcon,
                  tooltip: 'Editar usuario',
                  onClick: (event, rowData) => this.seleccionarUsuario(rowData, "Editar")
                },
                {
                  icon: DeleteIcon,
                  tooltip: 'Eliminar usuario',
                  onClick: (event, rowData) => this.seleccionarUsuario(rowData, "Eliminar")
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
                    type="number"
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
                    type="email"
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
                    type="number"
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
                    type="email"
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
