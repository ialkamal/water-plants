import { LOGIN_USER, LOGOUT_USER, GET_PROFILE, ADD_PROFILE } from "../actions";

const initialState = {
  user: "",
  loggedIn: false,
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      if (!window.localStorage.getItem("user"))
        window.localStorage.setItem(
          "user",
          JSON.stringify(action.payload, null, 2)
        );
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}
