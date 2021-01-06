import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPlant, getH2OHint } from "../store/actions";

const EditPlant = (props) => {
  const initialPlant = JSON.parse(window.localStorage.getItem("plant"));

  const [plant, setPlant] = useState(initialPlant);

  const history = useHistory();
  const { id } = useParams();

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleChange = (e) => {
    setPlant({
      ...plant,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //save to the server
    props.editPlant(plant);
    //setPlant();
    history.push(`/plants/${id}`);
  };

  const handleH2OHint = (e) => {
    e.preventDefault();
    console.log(plant.nickname);
    props.getH2OHint(plant.nickname);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h2>Edit Plant</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          width: "300px",
          alignItems: "center",
          flexFlow: "column wrap",
          margin: "10px auto",
        }}
      >
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
        <button onClick={handleH2OHint}>Give me a hint!</button>
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={plant.image}
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

export default connect(mapStateToProps, { editPlant, getH2OHint })(EditPlant);
