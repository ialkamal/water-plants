import {
  LOGIN_USER,
  LOGOUT_USER,
  GET_PROFILE,
  PROFILE_LOADING,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "../actions";

const initialState = {
  user: "",
  loggedIn: false,
  isLoading: false,
  isError: false,
  error: "",
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROFILE:
      window.localStorage.setItem(
        "user",
        JSON.stringify(action.payload, null, 2)
      );
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isError: false,
        error: "",
      };
    case UPDATE_PROFILE:
      window.localStorage.setItem(
        "user",
        JSON.stringify(action.payload, null, 2)
      );
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isError: false,
        error: "",
      };
    case PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
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
