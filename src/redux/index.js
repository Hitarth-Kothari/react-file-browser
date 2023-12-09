import { combineReducers } from "redux";
import fileReducer from "./reducer";

const rootReducer = combineReducers({
  file: fileReducer,
});

export default rootReducer;
