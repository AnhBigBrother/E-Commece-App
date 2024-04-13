import userProfileReducer from "./userProfileReducer";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  user: userProfileReducer,
});

export default allReducer;
