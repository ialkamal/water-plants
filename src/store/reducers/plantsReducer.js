import {
  GET_PLANTS,
  ADD_PLANT,
  START_UPLOAD,
  PLANTS_LOADING,
  PLANTS_ERROR,
  GET_PLANT,
  DELETE_PLANT,
} from "../actions";

const initialState = {
  plants: [],
  plant: {},
  isLoading: false,
  isUploading: false,
  isError: false,
  error: "",
};

export function plantsReducer(state = initialState, action) {
  switch (action.type) {
    case PLANTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case START_UPLOAD:
      return {
        ...state,
        isUploading: true,
      };
    case GET_PLANTS:
      return {
        ...state,
        plants: action.payload,
        isLoading: false,
        isError: false,
        error: "",
      };
    case GET_PLANT:
      window.localStorage.setItem(
        "plant",
        JSON.stringify(action.payload, null, 2)
      );
      return {
        ...state,
        plant: action.payload,
        isLoading: false,
        isError: false,
        error: "",
      };
    case PLANTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isUploading: false,
        isError: true,
        error: action.payload,
      };
    case ADD_PLANT:
      return {
        ...state,
        isUploading: false,
        isError: false,
        error: "",
      };
    case DELETE_PLANT:
      return {
        ...state,
        plants: state.plants.filter((plant) => plant.id !== action.payload),
      };
    default:
      return state;
  }
}
