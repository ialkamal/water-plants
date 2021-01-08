import axios from "axios";
import axiosWithAuth from "../../utils/axiosWithAuth";
import calculateWaterFrequency from "../../utils/calculateWaterFrequency";

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
export const START_UPLOAD = "START_UPLOAD";
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

export const addPlant = (plant, file) => {
  return (dispatch) => {
    //use axiosWithAuth for endpoint once done
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tabmei7f");
      dispatch({ type: START_UPLOAD });
      axios
        .post("https://api.Cloudinary.com/v1_1/ialkamal/image/upload", formData)
        .then((res) => res.data.secure_url)
        .then((url) =>
          axiosWithAuth()
            .post("/api/plants", { ...plant, image: url })
            .then((res) => res)
            .catch((err) => alert(err.message))
        )
        .then((res) => {
          dispatch({
            type: ADD_PLANT,
          });
        })
        .catch((err) => {
          alert(err.message);
          dispatch({ type: PLANTS_ERROR, payload: err.message });
        });
    } else {
      dispatch({ type: START_UPLOAD });
      axiosWithAuth()
        .post("/api/plants", {
          ...plant,
          image:
            "https://res.cloudinary.com/ialkamal/image/upload/v1609968753/yucca-cane_oyrye9.jpg",
        })
        .then((res) =>
          dispatch({
            type: ADD_PLANT,
          })
        )
        .catch((err) => {
          alert(err.message);
          dispatch({ type: PLANTS_ERROR, payload: err.message });
        });
    }
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

export const editPlant = (plant, file) => {
  return (dispatch) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tabmei7f");
      dispatch({ type: START_UPLOAD });
      axios
        .post("https://api.Cloudinary.com/v1_1/ialkamal/image/upload", formData)
        .then((res) => res.data.secure_url)
        .then((url) =>
          axiosWithAuth()
            .put(`/api/plants/${plant.id}`, { ...plant, image: url })
            .then((res) => res)
            .catch((err) => alert(err.message))
        )
        .then((res) => {
          dispatch({
            type: ADD_PLANT,
          });
        })
        .catch((err) => {
          alert(err.message);
          dispatch({ type: PLANTS_ERROR, payload: err.message });
        });
    } else {
      dispatch({ type: START_UPLOAD });
      axiosWithAuth()
        .put(`/api/plants/${plant.id}`, plant)
        .then((res) =>
          dispatch({
            type: ADD_PLANT,
          })
        )
        .catch((err) => {
          alert(err.message);
          dispatch({ type: PLANTS_ERROR, payload: err.message });
        });
    }
  };
};

export const getPlant = (id) => {
  return (dispatch) => {
    //use axiosWithAuth for endpoint once done
    dispatch({ type: PLANTS_LOADING });
    axiosWithAuth()
      .get(`/api/plants/${id}`)
      .then((res) => dispatch({ type: GET_PLANT, payload: res.data.plant }))
      .catch((err) => dispatch({ type: PLANTS_ERROR, payload: err.message }));
  };
};

export const getH2OHint = (nickname) => {
  return (dispatch) => {
    //use axiosWithAuth for endpoint once done
    axiosWithAuth()
      .get(`/api/usda/filtered-search/?commonName=${nickname}`)
      .then((res) => {
        if (res.data.result === "zero qualifying results")
          alert("Sorry! no hint today");
        else {
          const waterFrequency = calculateWaterFrequency(res.data.result);
          alert(
            `The recommended watering frequency is ${waterFrequency} ${
              waterFrequency === 1 ? "time" : "times"
            } per month`
          );
        }
      })
      .catch((err) => alert(err.message, "Most probably nickname is missing!"));
  };
};
