import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions";

const Navigation = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;

  background: #9cc799;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 5rem;
  color: #fffaf0;
  a {
    text-decoration: none;
    color: #fffaf0;
    font-weight: bold;
    margin-right: 40px;
    font-size: 1.8rem;
  }
`;

const Navbar = (props) => {
  const handleLogout = () => {
    if (window.localStorage.getItem("token")) props.logout();
  };

  return (
    <Navigation>
      <NavLink to="/">Log In</NavLink>
      <NavLink to="/" onClick={handleLogout}>
        Log Out
      </NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/plants">Water My Plants</NavLink>
    </Navigation>
  );
};

export default connect(null, { logout })(Navbar);
