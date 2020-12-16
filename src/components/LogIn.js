import React, { useState } from "react";

const LogIn = () => {
  const initialCredentials = {
    username: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(initialCredentials);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //handle sending credentials to server and getting the token
    setCredentials(initialCredentials);
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

export default LogIn;
