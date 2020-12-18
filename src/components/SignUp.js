import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const initialCredentials = {
    username: "",
    phone: "",
    password: "",
  };

  const history = useHistory();

  const [credentials, setCredentials] = useState(initialCredentials);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //handle sending credentials to server
    axiosWithAuth()
      .post("/api/users/register", credentials)
      .then((res) => {
        console.log(res.data);
        history.push("/");
      })
      .catch((err) => console.log(err));

    setCredentials(initialCredentials);
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
          type="text"
          name="phone"
          autoComplete="phone-number"
          value={credentials.phone}
          placeholder="phone number"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          value={credentials.password}
          placeholder="password"
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
