import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPlants, deletePlant } from "../store/actions";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "./Plants.css";

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

const Plants = (props) => {
  useEffect(() => {
    if (!props.isUploading) props.getPlants();
  }, [props.isUploading]);

  const handleDelete = (id) => {
    props.deletePlant(id);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h2 style={{ marginBottom: "3rem" }}>Plants</h2>
      {props.isLoading || props.isUploading ? (
        <pre>Loading...</pre>
      ) : (
        <>
          <NavLink className="AddPlant" to="/plants/add">
            Add Plant
          </NavLink>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {props.isError ? (
              <pre>Error: {props.error}</pre>
            ) : (
              props.plants.map((plant) => (
                <div key={plant.id} style={{ width: "600px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row wrap",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "0 auto",
                      padding: "20px",
                    }}
                  >
                    <img src={plant.image} alt={plant.nickname} height="300" />
                    <div style={{ marginLeft: "30px", textAlign: "left" }}>
                      <NavLink
                        style={{
                          textDecoration: "none",
                          fontWeight: "500",
                          fontSize: "1.2rem",
                          color: "#45b649",
                        }}
                        to={`/plants/${plant.id}`}
                      >
                        <p>{plant.nickname}</p>
                      </NavLink>
                      <p>
                        <span style={{ fontWeight: "500" }}>Binomial:</span>{" "}
                        {plant.binomial}
                      </p>
                      <p>
                        <span style={{ fontWeight: "500" }}>
                          H2O Frequency:
                        </span>{" "}
                        {plant.water_frequency} 💦 / month
                      </p>
                      <Button onClick={() => handleDelete(plant.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plants: state.plants.plants,
    isLoading: state.plants.isLoading,
    isUploading: state.plants.isUploading,
    isError: state.plants.isError,
    error: state.plants.error,
  };
};

export default connect(mapStateToProps, { getPlants, deletePlant })(Plants);
