import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { editPlant } from "../store/actions";

const EditPlant = (props) => {
  const [plant, setPlant] = useState(props.plant);

  const history = useHistory();

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleChange = (e) => {
    setPlant({ ...plant, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //save to the server
    history.goBack();
  };

  return (
    <div>
      <h2>Edit Plant</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nickname">Nickname</label>
        <input
          type="text"
          id="nickname"
          name="name"
          value={plant.name}
          onChange={handleChange}
        />
        <label htmlFor="species">Species</label>
        <input
          type="text"
          id="species"
          name="year"
          value={plant.year}
          onChange={handleChange}
        />
        <label htmlFor="h2ofrequency">H20 Frequency</label>
        <input
          type="text"
          id="h2ofrequency"
          name="color"
          value={plant.color}
          onChange={handleChange}
        />
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="pantone_value"
          value={plant.pantone_value}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plant: state.plants.plant,
  };
};

export default connect(mapStateToProps, { editPlant })(EditPlant);
