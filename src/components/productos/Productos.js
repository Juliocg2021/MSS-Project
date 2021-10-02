/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import Navigation from '../globals/Navigation'
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
import { render } from '@testing-library/react';
import ListaProductos from './ListaProductos';

export default class Productos extends Component {
  render() {
    return (
      <>
        <Navigation />
        <>
          <ListaProductos />
        </>
      </>
    );
  }
}