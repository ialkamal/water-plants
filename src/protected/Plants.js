import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPlants, deletePlant } from "../store/actions";
import { NavLink } from "react-router-dom";

const Plants = (props) => {
  useEffect(() => {
    props.getPlants();
  }, []);

  const handleDelete = (id) => {};

  return (
    <div>
      <h2>Plants</h2>

      <NavLink to="/plants/add">Add Plant</NavLink>

      {props.plants.map((plant) => (
        <div key={plant.id}>
          <NavLink to={`/plants/${plant.id}`}>
            <pre>{JSON.stringify(plant, null, 2)}</pre>
          </NavLink>
          <button onClick={handleDelete}>x</button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plants: state.plants.plants,
  };
};

export default connect(mapStateToProps, { getPlants, deletePlant })(Plants);
