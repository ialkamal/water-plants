import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProfile, editPassword, getProfile } from "../store/actions";
import styled from "styled-components"
import reactDom from "react-dom"


const EditProfile = (props) => {
  const initialPassword = {
    oldPassword: "",
    password: "",
  };

  const initialUser = JSON.parse(window.localStorage.getItem("user"));

  const [user, setUser] = useState(initialUser);
  const [password, setPassword] = useState(initialPassword);

  const history = useHistory();

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleProfileChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //save to the server
    props.editProfile(user);
    if (password.oldPassword !== "" && password.password !== "") {
      props.editPassword(password);
      setPassword(initialPassword);
    }
    setUser(initialUser);
    history.push("/profile");
  }; 

  
  

  const FormContainer = styled.div`
  margin-top: 9rem;
`;
  const Form = styled.form``;

  const FormGroup = styled.div``;

  const Label = styled.h3``;

  const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  display: flex;
  text-align: center;
  width: 95px;
  margin-left:48%;
  margin-right:45%;
`;

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

  const Upload = styled.input.attrs((props) => ({
    type: "file",
    size: props.size || "1em",
  }))`
  border: 2px solid black;
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.inputColor || "black"};
  background: #9cc799;
  border: none;
  border-radius: 3px;
`


  return (
    <FormContainer>
      <header>
      <h2>Edit User Profile</h2>
      </header>

      <Form onSubmit={handleSubmit}>
        <FormGroup>

      <Label>Profile Picture</Label> 
      <Upload type="file" 
      accept="image/*" 
      onChange={null} />
      <img
       ref={null}
       />
        
        <Label  htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          disabled={true}
          value={user.username}
        />
        <Label htmlFor="phone">Phone</Label>
        <Input
          type="text"
          id="phone"
          name="phone"
          value={user.phone}
          onChange={handleProfileChange}
        />
        <Label  htmlFor="old-password">Old Password</Label>
        <Input
          type="password"
          id="old-password"
          name="oldPassword"
          value={password.oldPassword}
          onChange={handlePasswordChange}
        />
        <Label htmlFor="new-password">New Password</Label>
        <Input
          type="password"
          id="new-password"
          name="password"
          value={password.password}
          onChange={handlePasswordChange}
        />

        <Button type="submit">Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </FormGroup>
      </Form>
    </FormContainer>
  );
};


const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    isError: state.users.isError,
    error: state.users.error,
  };
};

export default connect(mapStateToProps, {
  editProfile,
  editPassword,
  getProfile,
})(EditProfile);
