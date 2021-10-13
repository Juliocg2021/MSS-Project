import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return <button onClick={() => logout()}>Deseo terminar mi sesión en MSS Project</button>;
};

export default LogoutButton;