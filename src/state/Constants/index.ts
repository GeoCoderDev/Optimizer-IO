import { combineReducers } from "redux";
import animationsDurationSlice from "./animationsDuration";

const globalConstantsReducer = combineReducers({
  animationsDuration: animationsDurationSlice,
});

export default globalConstantsReducer;
