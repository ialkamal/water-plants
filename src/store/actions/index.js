import axiosWithAuth from "../../utils/axiosWithAuth";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const GET_PROFILE = "GET_PROFILE";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const GET_PLANTS = "GET_PLANTS";
export const ADD_PLANT = "ADD_PLANT";
export const EDIT_PLANT = "EDIT_PLANT";

export const login = (user) => {
  return { type: LOGIN_USER, payload: user.username };
};

export const logout = () => {
  window.localStorage.removeItem("token");
  return {
    type: LOGOUT_USER,
  };
};

export const getProfile = () => {};

export const editProfile = () => {};

export const getPlants = () => {
  return (dispatch) => {
    axiosWithAuth()
      .get("")
      .then((res) => dispatch({ type: GET_PLANTS, payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const addPlant = () => {};

export const editPlant = () => {};
