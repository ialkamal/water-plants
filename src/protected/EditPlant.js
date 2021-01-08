import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPlant, getH2OHint } from "../store/actions";

const EditPlant = (props) => {
  const initialPlant = JSON.parse(window.localStorage.getItem("plant"));

  const [plant, setPlant] = useState(initialPlant);
  const [file, setFile] = useState("");

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
    props.editPlant(plant, file);
    //setPlant();
    history.push(`/plants/${id}`);
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

        <label htmlFor="image">Image URL</label>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {/* <input
          type="text"
          id="image"
          name="image"
          value={plant.image}
          onChange={handleChange}
        /> */}
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
