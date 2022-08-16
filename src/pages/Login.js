import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CredentialsContext } from "../App";
import "./Stylesheet/login.css";
export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);
  const login = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password,
        });

        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const navigate = useNavigate();

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2>Login</h2>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <form
          onSubmit={login}
          className="login-form-wrapper"
          autoComplete="off"
        >
          <input
            id="login"
            className="fadeIn second mb-3"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
          />
          <input
            id="password"
            className="fadeIn second mb-2"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <div className="submit-btn">
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </div>
        </form>
      </div>
    </div>
  );
}
