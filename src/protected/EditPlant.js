import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPlant, getH2OHint } from "../store/actions";
import * as Yup from "yup";
import styled, { css } from "styled-components";

const sharedStyles = css`
  height: 40px;
  border-radius: 12px;
  border: 3px solid #9cc799;
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
  background-color: #9cc799;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(138, 138, 138, 0.5);
`;

const StyledInput = styled.input`
display:block;
width 100%;
${sharedStyles}
&:focus{
  outline:none;
  border: 3px solid #45b649;
}`;

const StyledUpload = styled.label`
  cursor: pointer;
  background: #45b649;
  display: block;
  width: 100%;
  height: 40px;
  border-radius: 12px;
  border: 3px solid #9cc799;
  margin: 10px 0;
  padding: 20px;
  box-sizing: border-box;
  font-family: sans-serif;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  &:focus {
    outline: none;
    transition: ease-in 0.2s;
    border: 3px solid #fff;
  }
`;

const Hidden = styled.input`
  display: none;
`;

const StyledButton = styled.button`
  padding: 1rem;
  background-color: #45b649;
  border-radius: 100px;
  margin: 20px 10px;
  width: 25%;
  border: none;
  color: white;
  font-weight: 800;
  cursor: pointer;
  outline: none;

  &:hover {
    background: white;
    color: #45b649;
    transition: ease-in 0.2s;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;

    &:hover {
      background: #45b649;
      color: white;
      transition: ease-in 0.2s;
    }
  }
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 1rem;
  margin: 20px;
  height: 1rem;
`;

const EditPlant = (props) => {
  const initialPlant = JSON.parse(window.localStorage.getItem("plant"));

  const [plant, setPlant] = useState(initialPlant);
  const [file, setFile] = useState("");
  const [errors, setErrors] = useState({
    nickname: "",
    binomial: "",
    water_frequency: "",
    image: "",
  });
  const [disabled, setDisabled] = useState(true);

  const schema = Yup.object().shape({
    nickname: Yup.string("Must be a valid string")
      .required("Nickname is required")
      .min(2, "Username must be at least 2 characters long"),
    binomial: Yup.string("Must be a valid string")
      .required("Binomial is required")
      .min(2, "Username must be at least 2 characters long"),
    water_frequency: Yup.number()
      .required("Must be a postive number value")
      .positive("Must be a postive number value")
      .integer("Must be a postive number value"),
    image: Yup.mixed().default("n/a"),
  });

  const setFormErrors = (name, value) => {
    Yup.reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  useEffect(() => {
    schema.isValid(plant).then((valid) => setDisabled(!valid));
  }, [plant]);

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
    setFormErrors(e.target.name, e.target.value);
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
      <FormWrapper>
        <h2>Edit Plant</h2>

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
            id="water_frequency"
            name="water_frequency"
            placeholder="Water Frequency"
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
          <StyledButton type="submit" disabled={disabled}>
            Update
          </StyledButton>
          <StyledButton onClick={handleCancel}>Cancel</StyledButton>
        </StyledForm>

        <ErrorMessage>
          <p>{errors.nickname}</p>
          <p>{errors.binomial}</p>
          <p>{errors.water_frequency}</p>
        </ErrorMessage>
      </FormWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plant: state.plants.plant,
  };
};

export default connect(mapStateToProps, { editPlant })(EditPlant);
