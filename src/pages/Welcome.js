import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CredentialsContext } from "../App";
import Todos from "../components/Todos";

import "./Stylesheet/login.css";
export default function Welcome() {
  const [credentails, setCredentials] = useContext(CredentialsContext);
  const logout = () => {
    setCredentials(null);
  };

  return (
    <div className="wrapper fadeInDown">
      {credentails && <button onClick={logout}>Logout</button>}
      <br />
      <h1>Welcome {credentails && credentails.username}</h1>
      {!credentails && (
        <Link to="/register" className="underlineHover">
          Register
        </Link>
      )}
      <br />
      {!credentails && (
        <Link to="/login" className="underlineHover">
          Login
        </Link>
      )}
      {credentails && <Todos />}
    </div>
  );
}
