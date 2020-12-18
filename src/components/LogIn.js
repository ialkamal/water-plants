import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axiosWithAuth from "../utils/axiosWithAuth";
import { login } from "../store/actions";

const LogIn = (props) => {
  const initialCredentials = {
    username: "",
    password: "",
  };

  const history = useHistory();
  const [credentials, setCredentials] = useState(initialCredentials);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //handle sending credentials to server and getting the token
    axiosWithAuth()
      .post("/api/users/login", credentials)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        props.login(credentials);
        setCredentials(initialCredentials);
        history.push("/plants");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          autoComplete="username"
          value={credentials.username}
          placeholder="username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={credentials.password}
          placeholder="password"
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default connect(null, { login })(LogIn);
