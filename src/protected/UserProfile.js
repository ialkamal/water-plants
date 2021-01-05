import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getProfile } from "../store/actions";

const UserProfile = (props) => {
  const history = useHistory();

  useEffect(() => {
    props.getProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <pre>{JSON.stringify(props.user, null, 2)}</pre>
      <button onClick={() => history.push(`/profile/edit`)}>Edit</button>
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

export default connect(mapStateToProps, { getProfile })(UserProfile);
