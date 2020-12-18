import React, { useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as yup from 'yup';
import { useHistory} from 'react-router-dom'


const schema = yup.object().shape({
  username: yup.string()
    .required('Please enter username.')
    .min(2),
  password: yup.string()
    .required('Please enter password.')
    .min(6)
})

const defaultFormState = {
  username: '',
  password: '',
}

const defaultErrorState = {
  username: '',
  password: ''
}


const FormContainer = styled.div`
  `
const Form = styled.div`
 `
const FormGroup = styled.div`
 `
const Label = styled.h3`
 

 `
const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.size || "1em",
}))`
  border: 2px solid black;
   padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "black"};
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
  color: ${props => props.inputColor || "black"};
  background: #9cc799;
  border: none;
  border-radius: 3px;
`;


const Button = styled.button`
 font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px
 `

function LoginForm() {

  const [formState, setFormState] = useState(defaultFormState);
  const [errors, setErrors] = useState(defaultErrorState);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    schema.isValid(formState).then(valid => setIsDisabled(!valid));
  }, [formState])

  const validate = e => {
    e.persist();
    yup.reach(schema, e.target.name).validate(e.target.value)
      .then(valid => setErrors({ ...errors, [e.target.name]: '' }))
      .catch(err => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('form Submitted:', formState);
    axios.post("https://water-my-plants-lambda.herokuapp.com/", formState)
      .then(res => {
        console.log('res:', res.data);
        setFormState(defaultFormState);
        history.push('/')
      })
      .catch(err => console.log(err));
  }
  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
    if (e.target.name === 'username' || e.target.name === 'password') {
      validate(e);
    }
  }


  return (
    <FormContainer>
      <header>
        <h1 className='text-center'>Welcome Back!</h1>
      </header>
      <Form className="login-form" onSubmit={handleSubmit}>
        <FormGroup >
          <Label>Username </Label>
          <Input type='text' name='username' value={formState.username} onChange={handleChange}></Input>
          {errors.username.length > 0 && <p style={{ color: 'red', marginBottom: '-.75rem' }}>{errors.username}</p>}
          <Label>Password</Label>
          <PasswordInput type='password' name='password' value={formState.password} onChange={handleChange}></PasswordInput>
          {errors.password.length > 0 && <p style={{ color: 'red', marginBottom: '-.75rem' }}>{errors.password}</p>}
        </FormGroup>
        <Button disabled={isDisabled} className='btn-lg btn-block' type='submit' name='submit' color="success">
          Login
                </Button>
        <div className='text-center pt-3'>Don't have an account?<br></br>
                    <a href='/SignUp'> Sign Up</a>
        </div>
      </Form>
    </FormContainer>
  )
}

export default LoginForm;