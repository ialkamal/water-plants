import axiosWithAuth from "../../utils/axiosWithAuth";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const PROFILE_LOADING = "PROFILE_LOADING";
export const PROFILE_ERROR = "PROFILE_ERROR";
export const GET_PROFILE = "GET_PROFILE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const PLANTS_LOADING = "PLANTS_LOADING";
export const PLANTS_ERROR = "PLANTS_ERROR";
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
    dispatch({ type: PROFILE_LOADING });
    axiosWithAuth()
      .get("/api/users")
      .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
      .catch((err) => dispatch({ type: PROFILE_ERROR, payload: err.message }));
  };
};

export const editProfile = (user) => {
  return (dispatch) => {
    axiosWithAuth()
      .put("/api/users/phone", { phone: user.phone })
      .then((res) => {
        dispatch({ type: UPDATE_PROFILE, payload: user });
      })
      .catch((err) => alert(err.message));
  };
};

export const editPassword = (password) => {
  return (dispatch) => {
    axiosWithAuth()
      .put("/api/users/password", password)
      .then((res) => alert(res.data.message))
      .catch((err) => alert("Password could not be changed!"));
  };
};

export const getPlants = () => {
  return (dispatch) => {
    //use axiosWithAuth for endpoint once done
    dispatch({ type: PLANTS_LOADING });
    axiosWithAuth()
      .get("/api/plants")
      .then((res) => dispatch({ type: GET_PLANTS, payload: res.data.plants }))
      .catch((err) => dispatch({ type: PLANTS_ERROR, payload: err.message }));
  };
};

export const addPlant = (plant) => {
  return (dispatch) => {
    //use axiosWithAuth for endpoint once done
    dispatch({ type: PLANTS_LOADING });
    axiosWithAuth()
      .post("/api/plants", plant)
      .then(
        (res) => console.log(res)
        // dispatch({
        //   type: ADD_PLANT,
        //   payload: { ...plant, id: res.data.newPlantId },
        // })
      )
      .catch((err) => console.log(err));
  };
};

export const deletePlant = (id) => {
  console.log("DELETE");
  return (dispatch) => {
    //use axiosWithAuth for endpoint once done
    axiosWithAuth()
      .delete(`/api/plants/${id}`)
      .then((res) => dispatch({ type: DELETE_PLANT, payload: id }))
      .catch((err) => console.log(err));
  };
};

export const editPlant = (plant) => {
  return (dispatch) => {
    axiosWithAuth()
      .put(`/api/plants/${plant.id}`, plant)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
};

export const getPlant = (id) => {
  return (dispatch) => {
    //use axiosWithAuth for endpoint once done
    axiosWithAuth()
      .get(`/api/plants/${id}`)
      .then((res) => dispatch({ type: GET_PLANT, payload: res.data.plant }))
      .catch((err) => dispatch({ type: PLANTS_ERROR, payload: err.message }));
  };
};
