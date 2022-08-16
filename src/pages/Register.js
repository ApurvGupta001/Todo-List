import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CredentialsContext } from "../App";
import "./Stylesheet/signup.css";
export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const register = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/register", {
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
        <h2>Register</h2>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <form
          onSubmit={register}
          action="/login"
          className="signup-form-wrapper"
        >
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="fadeIn second mb-3"
            placeholder="username"
          />
          <br />
          <input
            type="password"
            className="fadeIn second mb-3"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <br />
          <div className="submit-btn">
            <input type="submit" className="fadeIn fourth" value="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  );
}
