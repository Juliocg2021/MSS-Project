
import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Navigation from '../globals/Navigation'


import "react-json-pretty/themes/monikai.css";

const Profile = () => {
  const { user} = useAuth0();

  const { given_name, family_name, nickname, email, picture, sub, updated_at} = user;
 
  return (
    <>
        <Navigation />
        <div className="contenedor">
            <h1>Mi perfil</h1>
            <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />
            <h2 className ="mb-3">{user.name}</h2>
            <p>Nombre de usuario: {user.nickname}</p>
            <p>Email: {user.email}</p>
            <p>ID: {user.sub}</p>
            <p>Fecha de actualización: {user.updated_at}</p>
            
        </div>
      
      
    </>

  );
};

export default Profile;