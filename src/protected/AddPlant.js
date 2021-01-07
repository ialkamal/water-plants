import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { editPlant, addPlant, getH2OHint } from "../store/actions";

const AddPlant = (props) => {
  const initialState = {
    nickname: "",
    binomial: "",
    water_frequency: "",
    image: "",
  };

  const [plant, setPlant] = useState(initialState);
  const [file, setFile] = useState("");

  const history = useHistory();

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
    props.addPlant(plant, file);
    setPlant(initialState);
    history.push("/plants");
  };

  const handleH2OHint = (e) => {
    e.preventDefault();
    console.log(plant.nickname);
    props.getH2OHint(plant.nickname);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h2>Add Plant</h2>
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
        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
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

export default connect(mapStateToProps, { editPlant, addPlant, getH2OHint })(
  AddPlant
);
