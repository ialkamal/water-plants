import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProfile, editPassword, getProfile } from "../store/actions";

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

  return (
    <div style={{ marginTop: "200px" }}>
      <h2>Edit Profile</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          width: "200px",
          alignItems: "center",
          flexDirection: "column",
          margin: "20px auto",
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          disabled={true}
          value={user.username}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={user.phone}
          onChange={handleProfileChange}
        />
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          name="oldPassword"
          value={password.oldPassword}
          onChange={handlePasswordChange}
        />
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          name="password"
          value={password.password}
          onChange={handlePasswordChange}
        />

        <button type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
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
