import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

import Inicio from './components/inicio/Inicio'
import Productos from './components/productos/Productos'
import Ventas from './components/ventas/Ventas'
import Usuarios from './components/usuarios/Usuarios'
import Login from './components/login/Login'
import Logout from './components/login/Logout'
import Profile from './components/login/Profile'

import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { isAuthenticated, isLoading } = useAuth0();
  
  return (
    <Router>
      <div className="">
        {isAuthenticated ? 

        <div className="">
          <Route exact path="/" component={Inicio} />
          <Route exact path="/productos" component={Productos} />
          <Route exact path="/ventas" component={Ventas} />
          <Route exact path="/usuarios" component={Usuarios} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/profile" component={Profile} />
        </div>

        :

        <div className="">
          <Route exact path="/" component={Login} />
          <Route exact path="/productos" component={Login} />
          <Route exact path="/ventas" component={Login} />
          <Route exact path="/usuarios" component={Login} />
          <Route exact path="/logout" component={Login} />
          <Route exact path="/profile" component={Login} />

        </div>

        }

      </div>
    </Router>
  );
}

export default App;
