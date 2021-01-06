import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProfile } from "../store/actions";

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
      <button onClick={() => history.push(`/profile/edit`)}>Edit</button>
      <button onClick={() => history.goBack()}>Back</button>
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
