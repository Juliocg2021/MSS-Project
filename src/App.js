import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Inicio from './components/inicio/Inicio'
import Productos from './components/productos/Productos'
import Ventas from './components/ventas/Ventas'
import Usuarios from './components/usuarios/Usuarios'
import Login from './components/login/Login'
import Logout from './components/login/Logout'
import Profile from './components/login/Profile'
import ProtectedRoute from './auth/protected-route';

import Loading from './components/login/Loading';

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" >
      <div>
      <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/" component={Inicio} />
            <ProtectedRoute path="/ventas" component={Ventas} />
            <ProtectedRoute path="/productos" component={Productos} />
            <ProtectedRoute path="/usuarios" component={Usuarios} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/logout" component={Logout} />
            <Route path="/login" component={Login} />
          </Switch>
      </BrowserRouter>
      </div>
    </div>
  );
};

export default App;