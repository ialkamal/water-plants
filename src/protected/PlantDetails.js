import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getPlant } from "../store/actions";

const PlantDetails = (props) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    props.getPlant(id);
  }, []);

  return (
    <div>
      <h2>Plant Details</h2>
      <pre>{JSON.stringify(props.plant, null, 2)}</pre>
      <button onClick={() => history.push(`/plants/${id}/edit`)}>Edit</button>
      <button onClick={() => history.push("/plants")}>Back</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plant: state.plants.plant,
  };
};

export default connect(mapStateToProps, { getPlant })(PlantDetails);
