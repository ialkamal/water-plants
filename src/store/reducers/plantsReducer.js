import {
  GET_PLANTS,
  ADD_PLANT,
  EDIT_PLANT,
  GET_PLANT,
  DELETE_PLANT,
} from "../actions";

const initialState = {
  plants: [],
  plant: {},
};

export function plantsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLANTS:
      return {
        ...state,
        plants: action.payload,
      };
    case GET_PLANT:
      window.localStorage.setItem(
        "plant",
        JSON.stringify(action.payload, null, 2)
      );
      return {
        ...state,
        plant: action.payload,
      };
    case ADD_PLANT:
      console.log("NEW PLANT: ", action.payload);
      return state;
    case DELETE_PLANT:
      return {
        ...state,
        plants: state.plants.filter((plant) => plant.id !== action.payload),
      };
    default:
      return state;
  }
}
