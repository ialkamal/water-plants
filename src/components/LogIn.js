import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axiosWithAuth from "../utils/axiosWithAuth";
import { login } from "../store/actions";

const schema = yup.object().shape({
  username: yup.string().required("Please enter username.").min(2),
  password: yup.string().required("Please enter password.").min(4),
});

const initialCredentials = {
  username: "",
  password: "",
};

const defaultErrorState = {
  username: "",
  password: "",
};

const FormContainer = styled.div`
  margin-top: 9rem;
`;
const Form = styled.form``;
const FormGroup = styled.div``;
const Label = styled.h3``;

const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "1em",
}))`
  border: 2px solid black;
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.inputColor || "black"};
  background: #9cc799;
  border: none;
  border-radius: 3px;
`;

const PasswordInput = styled(Input).attrs({
  type: "password",
})`
  border: 2px solid black;
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.inputColor || "black"};
  background: #9cc799;
  border: none;
  border-radius: 3px;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

function LogIn(props) {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [errors, setErrors] = useState(defaultErrorState);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    schema.isValid(credentials).then((valid) => setIsDisabled(!valid));
  }, [credentials]);

  const validate = (e) => {
    e.persist();
    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then((valid) => setErrors({ ...errors, [e.target.name]: "" }))
      .catch((err) => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/users/login", credentials)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        props.login(credentials);
        history.push("/plants");
      })
      .catch((err) => alert(err.message));
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    validate(e);
  };

  return (
    <FormContainer>
      <header>
        <h1 className="text-center">Welcome Back!</h1>
      </header>
      <Form className="login-form" onSubmit={handleSubmit}>
        <FormGroup>
          
          <Input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          ></Input>
          {errors.username.length > 0 && (
            <p style={{ color: "red", marginBottom: "-.75rem" }}>
              {errors.username}
            </p>
          )}
          <Label>Password</Label>
          <PasswordInput
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          ></PasswordInput>
          {errors.password.length > 0 && (
            <p style={{ color: "red", marginBottom: "-.75rem" }}>
              {errors.password}
            </p>
          )}
        </FormGroup>
        <Button
          disabled={isDisabled}
          className="btn-lg btn-block"
          type="submit"
          name="submit"
          color="success"
        >
          Login
        </Button>
        <div className="text-center pt-3">
          Don't have an account?
          <br></br>
          <a href="/SignUp" style={{ textDecoration: "none" }}>
            Sign Up
          </a>
        </div>
      </Form>
    </FormContainer>
  );
}

export default connect(null, { login })(LogIn);
