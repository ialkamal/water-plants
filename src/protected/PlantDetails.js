import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getPlant } from "../store/actions";
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

const PlantDetails = (props) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!props.isUploading) props.getPlant(id);
  }, [props.isUploading]);

  return (
    <div style={{ marginTop: "100px" }}>
      <h2>Plant Details</h2>
      {props.isLoading || props.isUploading ? (
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
            <p>
              <span style={{ fontWeight: "500" }}>Nickname:</span>{" "}
              {props.plant.nickname}
            </p>
            <p>
              <span style={{ fontWeight: "500" }}>Binomial:</span>{" "}
              {props.plant.binomial}
            </p>
            <p>
              <span style={{ fontWeight: "500" }}>H2O Frequency:</span>{" "}
              {props.plant.water_frequency} 💦 / month
            </p>
            <Button onClick={() => history.push(`/plants/${id}/edit`)}>
              Edit
            </Button>
            <Button onClick={() => history.push("/plants")}>Back</Button>
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
