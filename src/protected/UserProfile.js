import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProfile } from "../store/actions";
import styled from "styled-components";

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  display: flex;
  text-align: center;
  width: 95px;
  margin-left: 48%;
  margin-right: 45%;
`;

const UserProfile = (props) => {
  const history = useHistory();

  useEffect(() => {
    props.getProfile();
  }, []);

  return (
    <div style={{ marginTop: "200px" }}>
      <h2>Profile</h2>
      {props.isLoading ? (
        <pre>Loading...</pre>
      ) : props.isError ? (
        <pre>Error: {props.error}</pre>
      ) : (
        <>
          <p>Username: {props.user.username}</p>
          <p>Phone: {props.user.phone}</p>
        </>
      )}
      <Button onClick={() => history.push(`/profile/edit`)}>Edit</Button>
      <Button onClick={() => history.goBack()}>Back</Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    isLoading: state.users.isLoading,
    isError: state.users.isError,
    error: state.users.error,
  };
};

export default connect(mapStateToProps, { getProfile })(UserProfile);
