
import React, { Component } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Navigation from '../globals/Navigation'

import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
 
  return (
    <>
        <Navigation />
        <div className="container">
            <h1>Profile</h1>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <JSONPretty data={user} />;
        </div>
        
    </>

  );
};

export default Profile;