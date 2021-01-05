import React, { useState, useEffect } from "react";
import * as Yup from 'yup'
import axios from 'axios'
import styled, {createGlobalStyle, css} from 'styled-components'


const GlobalStyle = createGlobalStyle`
html{height:100%}
body{
  font-family: 'Poppins', sans-serif;
  color:white;
  background: linear-gradient(to bottom, #43C6AC ,#fffacf)
}

`

const sharedStyles = css`
backgroundcolor: #eee;
height:40px;
border-radius: 5px;
border: 2px solid #45B649;
margin: 10px 0 20px 0;
padding:20px;
box-sizing:border-box;`

const FormWrapper = styled.div`
display:flex;
justify-content: center;
flex-direction: column;
align-items: center;
height: 80vh;
padding:0 20px;
`
const StyledForm= styled.form`
width:100%;
max-width:700px;
padding:2.5rem;
border-radius: 20px;
background-color: rgba(250, 255, 209, .97);
box-sizing:border-box;
box-shadow: 0px 0px 20px rgba(138, 138, 138, .5);

`

const StyledInput = styled.input`
display:block;
width 100%;
${sharedStyles}`

const StyledButton= styled.button`
padding:1rem;
background-color:#45B649;
border-radius:100px;
width:50%;
border:none;
color: white;
font-weight: 800;;

&:disabled{
  opacity: .3;

}
`

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
    axios
      .post("https://water-my-plants-lambda.herokuapp.com/api/register", credentials)
      .then(res => {console.log("success", credentials, res);
      })
      .catch(err => console.log(err))
    setCredentials(initialCredentials);
  };

  return (
    
<div>
  <GlobalStyle/>
  <FormWrapper>
      <h2>Sign Up</h2>
      <StyledForm onSubmit={handleSubmit}>

      
        <StyledInput
          type="text"
          name="username"
          autoComplete="username"
          value={credentials.username}
          placeholder="email"
          onChange={handleChange}
        />
        <StyledInput
          type="tel"
          name="phoneNumber"
          autoComplete="phone-number"
          value={credentials.phoneNumber}
          placeholder="phone ex: 123-456-7890"
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
        <StyledButton type="submit" disabled={disabled}>Sign Up</StyledButton>
      </StyledForm>
    </FormWrapper>
</div>
    
  );
};

export default SignUp;
