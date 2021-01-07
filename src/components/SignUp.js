import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";


const sharedStyles = css`
  height: 40px;
  border-radius: 10px;
  border: 3px solid #9cc799;
  margin: 20px 0px;
  padding: 20px;
  box-sizing: border-box;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height:80vh;
  
  padding: 0 20px;
`;
const StyledForm = styled.form`
  width: 100%;
  max-width: 500px;
  padding: 2.5rem;
  border-radius: 20px;
  background-color: #9cc799;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(138, 138, 138, 0.5);
`;

const StyledInput = styled.input`
display:block;
width 100%;
${sharedStyles};

&:focus{
  outline:none;
  border: 3px solid #2c730e;
  transition: .5s ease-in;

}`;

const StyledButton = styled.button`
  padding: 1rem;
  
  border-radius: 100px;
  margin-top:10px;
  width: 50%;
  border: 3px white solid;
  background-color:white;
  color:#9cc799;
  font-weight: 800;
  cursor:pointer;
  transition: .2s ease-in;


  &:disabled {
    opacity: 0.5;
    cursor:default;
  }
`;

const ErrorMessage = styled.p`
  color:red;
  font-size:1rem;
  margin:20px;
  height:1rem;`
  

const SignUp = () => {

  const initialCredentials = {
    username: "",
    phone: "",
    password: "",
  };

  const history = useHistory();

  const [credentials, setCredentials] = useState(initialCredentials);
  const [disabled, setDisabled] = useState(true);

  const [errors, setErrors] = useState({
    
    username: "",
    phone: "",
    password: "",
  });

  const schema = Yup.object().shape({
    username: Yup.string("Must be a valid string")
      .required("Username is required")
      .min(2,'Username must be at least 2 characters long'),
    phone: Yup.string()
      .matches(/^([0-9]{3})[0-9]{3}[0-9]{4}$/, "Phone is required Ex: 1234567890")
      .required(""),
    password: Yup.string()
      .min(4, "Must be a minimum of 4 characters")
      .required("Password is required"),
  });

  const setFormErrors = (name, value) => {
    Yup.reach(schema,name).validate(value)
        .then(()=>setErrors({...errors, [name]:''}))
        .catch((err)=>setErrors({...errors, [name]:err.errors[0]}))
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setFormErrors(e.target.name,e.target.value)
  };

  useEffect(() => {
    schema.isValid(credentials).then((valid) => setDisabled(!valid));
  }, [credentials]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //handle sending credentials to server
    axiosWithAuth()
      .post("/api/users/register", credentials)
      .then((res) => {
        console.log(res.data);
        history.push("/");
      })
      .catch((err) => alert(err.message));

    setCredentials(initialCredentials);
  };

  return (
    <div>
      <FormWrapper>
        <h2>Sign Up</h2>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            name="username"
            autoComplete="username"
            value={credentials.username}
            placeholder="username"
            onChange={handleChange}
          />
          
          <StyledInput
            type="tel"
            name="phone"
            autoComplete="phone-number"
            value={credentials.phone}
            placeholder="phone"
            onChange={handleChange}
          />
          <StyledInput
            type="password"
            name="password"
            autoComplete="new-password"
            value={credentials.password}
            placeholder="password"
            onChange={handleChange}
          />

          <StyledButton type="submit" disabled={disabled}>
            Sign Up
          </StyledButton>

        </StyledForm>

        <ErrorMessage>
          <div>{errors.phone}</div>
          <div>{errors.password}</div>
          <div>{errors.username}</div>
        </ErrorMessage>

      </FormWrapper>

     



    </div>
  );
};

export default SignUp;
