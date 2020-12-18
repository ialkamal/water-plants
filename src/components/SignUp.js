import React, { useState } from "react";

const SignUp = () => {
  const initialCredentials = {
    username: "",
    phoneNumber: "",
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
          name="phoneNumber"
          autoComplete="phone-number"
          value={credentials.phoneNumber}
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