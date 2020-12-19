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
      return {
        ...state,
        plant: action.payload,
      };
    case ADD_PLANT:
      console.log("NEW PLANT: ", action.payload);
      return {
        ...state,
        plants: [...state.plants, action.payload],
      };
    default:
      return state;
  }
}
