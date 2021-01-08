import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getPlant } from "../store/actions";

const PlantDetails = (props) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!props.isUploading) props.getPlant(id);
  }, [props.isUploading]);

  return (
    <div style={{ marginTop: "100px" }}>
      <h2>Plant Details</h2>
      {props.isLoading || props.isUploading  ? (
        <pre>Loading...</pre>
      ) : props.isError ? (
        <pre>Error: {props.error}</pre>
      ) : (
        <div
          style={{
            display: "flex",
            margin: "20px auto",
            justifyContent: "center",
          }}
        >
          <img
            src={props.plant.image}
            alt={props.plant.nickname}
            height="300"
          />
          <div style={{ marginLeft: "30px", textAlign: "left" }}>
            <p>Nickname: {props.plant.nickname}</p>
            <p>Binomial: {props.plant.binomial}</p>
            <p>
              Watering Frequency: {props.plant.water_frequency} times / month
            </p>
            <button onClick={() => history.push(`/plants/${id}/edit`)}>
              Edit
            </button>
            <button onClick={() => history.push("/plants")}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plant: state.plants.plant,
    isLoading: state.plants.isLoading,
    isUploading: state.plants.isUploading,
    isError: state.plants.isError,
    error: state.plants.error,
  };
};

export default connect(mapStateToProps, { getPlant })(PlantDetails);
