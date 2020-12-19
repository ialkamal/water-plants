import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { editPlant, addPlant } from "../store/actions";

const AddPlant = (props) => {
  const initialState = {
    nickname: "",
    binomial: "",
    water_frequency: "",
    image: "",
  };

  const [plant, setPlant] = useState(initialState);

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
    props.addPlant(plant);
    setPlant(initialState);
    history.push("/plants");
  };

  return (
    <div>
      <h2>Add Plant</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nickname">Nickname</label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={plant.nickname}
          onChange={handleChange}
        />
        <label htmlFor="binomial">Binomial</label>
        <input
          type="text"
          id="binomial"
          name="binomial"
          value={plant.binomial}
          onChange={handleChange}
        />
        <label htmlFor="water_frequency">Water Frequency</label>
        <input
          type="text"
          id="water_frequency"
          name="water_frequency"
          value={plant.water_frequency}
          onChange={handleChange}
        />
        <label htmlFor="image">Image</label>
        <input
          type="text"
          id="image"
          name="image"
          value={plant.image}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
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

export default connect(mapStateToProps, { editPlant, addPlant })(AddPlant);
