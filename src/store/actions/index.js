import axiosWithAuth from "../../utils/axiosWithAuth";
import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const GET_PROFILE = "GET_PROFILE";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const GET_PLANTS = "GET_PLANTS";
export const ADD_PLANT = "ADD_PLANT";
export const EDIT_PLANT = "EDIT_PLANT";
export const GET_PLANT = "GET_PLANT";
export const DELETE_PLANT = "DELETE_PLANT";

export const login = (user) => {
  return { type: LOGIN_USER, payload: user.username };
};

export const logout = () => {
  window.localStorage.removeItem("token");
  return {
    type: LOGOUT_USER,
  };
};

export const getProfile = () => {
  return (dispatch) => {
    //use axiosWithAuth for endpoint once done
    axios
      .get("https://reqres.in/api/users/2")
      .then((res) => dispatch({ type: GET_PROFILE, payload: res.data.data }))
      .catch((err) => console.log(err));
  };
};

export const editProfile = () => {};

export const getPlants = () => {
  return (dispatch) => {
    //use axiosWithAuth for endpoint once done
    axios
      .get("https://reqres.in/api/unknown")
      .then((res) => dispatch({ type: GET_PLANTS, payload: res.data.data }))
      .catch((err) => console.log(err));
  };
};

export const addPlant = () => {};

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
