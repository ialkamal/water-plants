import { GET_PLANTS, ADD_PLANT, EDIT_PLANT } from "../actions";

const initialState = {
  plants: [],
};

export function plantsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLANTS:
      return {
        ...state,
        plants: action.payload,
      };
    default:
      return state;
  }
}
