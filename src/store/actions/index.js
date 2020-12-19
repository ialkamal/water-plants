import axiosWithAuth from "../../utils/axiosWithAuth";
import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const GET_PROFILE = "GET_PROFILE";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const EDIT_PASSWORD = "EDIT_PASSWORD";
export const GET_PLANTS = "GET_PLANTS";
export const ADD_PLANT = "ADD_PLANT";
export const EDIT_PLANT = "EDIT_PLANT";
export const GET_PLANT = "GET_PLANT";
export const DELETE_PLANT = "DELETE_PLANT";

export const login = (user) => {
  return { type: LOGIN_USER, payload: user.username };
};

export const logout = () => {
  window.localStorage.clear();
  return {
    type: LOGOUT_USER,
  };
};

export const getProfile = () => {
  return (dispatch) => {
    axiosWithAuth()
      .get("/api/users")
      .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const editProfile = (phoneValue) => {
  return (dispatch) => {
    axiosWithAuth()
      .put("/api/users/phone", { phone: phoneValue })
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
  };
};

export const editPassword = (password) => {
  return (dispatch) => {
    axiosWithAuth()
      .put("/api/users/password", password)
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
  };
};

export const getPlants = () => {
  return (dispatch) => {
    //use axiosWithAuth for endpoint once done
    axiosWithAuth()
      .get("/api/plants")
      .then((res) => dispatch({ type: GET_PLANTS, payload: res.data.plants }))
      .catch((err) => console.log(err));
  };
};

export const addPlant = (plant) => {
  return (dispatch) => {
    //use axiosWithAuth for endpoint once done
    axiosWithAuth()
      .post("/api/plants", plant)
      .then((res) =>
        dispatch({
          type: ADD_PLANT,
          payload: { ...plant, id: res.data.newPlantId },
        })
      )
      .catch((err) => console.log(err));
  };
};

export const deletePlant = () => {};

export const editPlant = () => {};

export const getPlant = (id) => {
  return (dispatch) => {
    //use axiosWithAuth for endpoint once done
    axios
      .get(`https://reqres.in/api/unknown/${id}`)
      .then((res) => dispatch({ type: GET_PLANT, payload: res.data.data }))
      .catch((err) => console.log(err));
  };
};
