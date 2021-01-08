import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { editPlant, addPlant, getH2OHint } from "../store/actions";
import styled, {css} from 'styled-components'

const sharedStyles = css`
  backgroundcolor: #eee;
  height: 40px;
  border-radius: 5px;
  border: 3px solid #45b649;
  margin: 10px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  padding: 0 20px;
`;
const StyledForm = styled.form`
  width: 100%;
  max-width: 500px;
  padding: 2.5rem;
  border-radius: 20px;
  background-color: rgba(250, 255, 209, 0.97);
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(138, 138, 138, 0.5);
`;

const StyledInput = styled.input`
display:block;
width 100%;
${sharedStyles}
&:focus{
  outline:none;
}`;

const StyledButton = styled.button`
  padding: 1rem;
  background-color: #45b649;
  border-radius: 100px;
  width: 50%;
  border: none;
  color: white;
  font-weight: 800;

  &:disabled {
    opacity: 0.3;
  }
`;

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
      

      <FormWrapper>

      <h2>Add Plant</h2>

      <StyledForm onSubmit={handleSubmit}>

        
        <StyledInput
          type="text"
          id="nickname"
          placeholder="Nickname"
          name="nickname"
          value={plant.nickname}
          onChange={handleChange}
        />
        
        <StyledInput
          type="text"
          id="binomial"
          name="binomial"
          placeholder="Binomial"
          value={plant.binomial}
          onChange={handleChange}
        />
        
        <StyledInput
          type="text"
          placeholder='Water Frequency'
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
      </StyledForm>

      </FormWrapper>
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
