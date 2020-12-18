import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProfile, getProfile } from "../store/actions";

const EditProfile = (props) => {
  const [user, setUser] = useState(props.user);

  const history = useHistory();

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //save to the server
    history.goBack();
  };

  return (
    <div>
      <h2>Edit User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="email"
          disabled={true}
          value={user.email}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="first_name"
          value={user.first_name}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="last_name"
          value={user.last_name}
          onChange={handleChange}
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
  };
};

export default connect(mapStateToProps, { editProfile, getProfile })(
  EditProfile
);
