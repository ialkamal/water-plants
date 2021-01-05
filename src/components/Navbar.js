import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = props => {
  return (
    <Navigation>
      <Link to="/">Log In</Link>
      <Link to="/" >
        Log Out
      </Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/profile">Profile</Link>
      <Link to='/'>Water My Plants</Link>
      </Navigation>
  );
}

const Navigation = styled.nav`
    position: fixed;
    top: 0;
    width: 100%;
    
    background:#9cc799;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 9rem;
    color: 	#fffaf0;
    a {
        text-decoration: none;
        color: 	#fffaf0;
        font-weight: bold;
        margin-right: 40px;
        font-size: 1.8rem;
    }
`

export default NavBar;