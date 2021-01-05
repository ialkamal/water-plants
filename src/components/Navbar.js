import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions";

const Navbar = (props) => {
  const handleLogout = () => {
    if (window.localStorage.getItem("token")) props.logout();
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <NavLink to="/">Log In</NavLink>
      <NavLink to="/" onClick={handleLogout}>
        Log Out
      </NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </div>
  );
};

export default connect(null, { logout })(Navbar);
