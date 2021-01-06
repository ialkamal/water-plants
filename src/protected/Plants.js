import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPlants, deletePlant } from "../store/actions";
import { NavLink } from "react-router-dom";

const Plants = (props) => {
  useEffect(() => {
    if (!props.isUploading) props.getPlants();
  }, [props.isUploading]);

  const handleDelete = (id) => {
    props.deletePlant(id);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h2>Plants</h2>
      {props.isLoading || props.isUploading ? (
        <pre>Loading...</pre>
      ) : (
        <>
          <NavLink to="/plants/add">Add Plant</NavLink>
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
                      <NavLink to={`/plants/${plant.id}`}>
                        <p>Nickname: {plant.nickname}</p>
                      </NavLink>
                      <p>Binomial: {plant.binomial}</p>
                      <p>
                        Watering Frequency: {plant.water_frequency} times /
                        month
                      </p>
                      <button onClick={() => handleDelete(plant.id)}>
                        Delete
                      </button>
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
