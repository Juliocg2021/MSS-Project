
import React, { Component, createElement, ReactDOM } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Navigation from '../globals/Navigation'

import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

const Profile = () => {
  const file = React.createRef();
  const { user, isAuthenticated } = useAuth0();
  const estilos = {
    display: "block",
    margin: "20px auto",
    width: "200px",
    borderRadius: "50%",

  };
  const estilosLetra = {
    textAlign: "center",
    fontSize: "18px"
  };
  const cajitas = {
    display: "block",
    margin: "auto auto",
    border: "1px solid rgb(1,1,1)",
    borderRadius: "10px",
    width: "450px",
    borderColor: "#051e49"
  }
  const perfil = {
    border: "1px solid rgb(1,1,1)",
    display: "block",
    margin: "30px auto",
    borderRadius: "10px",
    width: "550px",
    padding: "40px 10px",
    borderColor: "#051e49"
  }

  const dato = "<JSONPretty data={user} />"
  return (
    <>  

      <Navigation />
      <div className="container" style={perfil} >

        <img
          src={user.picture}
          alt={user.name}
          style={estilos}
          onClick={() => {
            let x = document.createElement("INPUT");
            x.type = "file";
            x.style.accept = "image/png, image/jpeg";
            x.style.display = "none";
            x.id = "imagenPerfil"
            x.click();
          }} />
        <div style={cajitas} >
          <p style={estilosLetra} ><b>Vendedor:</b></p>
          <h1 style={estilosLetra} >{user.nickname}</h1>
        </div>
        <br />
        <div style={cajitas}>
          <p style={estilosLetra} ><b>Cuenta:</b></p>
          <p style={estilosLetra} >{user.email}</p>
        </div>
      </div>
      
    </>

  );
};

export default Profile;