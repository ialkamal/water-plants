import { combineReducers } from "redux";
import { plantsReducer as plants } from "./plantsReducer";
import { usersReducer as users } from "./usersReducer";

export default combineReducers({
  plants, users
});