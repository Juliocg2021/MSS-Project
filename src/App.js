import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

import Inicio from './components/inicio/Inicio'
import Productos from './components/productos/Productos'
import Ventas from './components/ventas/Ventas'
import Usuarios from './components/usuarios/Usuarios'
import Login from './components/login/Login'

function App() {
  return (
    <Router>
      <div className="">
        <Route path="/" exact component={Inicio} />
        <Route path="/ventas" component={Ventas} />
        <Route path="/productos" component={Productos} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
