import React, { useState, useEffect } from "react";
import * as Yup from 'yup'
import 'yup-phone'
import axios from 'axios'

const SignUp = () => {
  const initialCredentials = {
    username: "",
    phoneNumber: "",
    password: "",
  };


  const [credentials, setCredentials] = useState(initialCredentials);
  const [disabled,setDisabled]=useState(true);


  const schema = Yup.object().shape({
    username: Yup
              .string()
              .email('Must be valid Email address').required(),
    phoneNumber: Yup
              .string()
              .matches(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/, '')
              .required('This field is required'),
    password: Yup
              .string()
              .min( 6, 'Must be a minimum of 6 characters')
              .required('This field is required')
  }
  );

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    schema.isValid(credentials).then(valid=>setDisabled(!valid))
    
  },[credentials])

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
          type="tel"
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
        <button type="submit" disabled={disabled}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
