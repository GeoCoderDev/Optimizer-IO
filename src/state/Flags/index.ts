import { combineReducers } from "redux";
import sidebarIsOpenedSlice from "./sidebarIsOpenedSlice";

const flagsReducer = combineReducers({
  sidebarIsOpened: sidebarIsOpenedSlice,
});

export default flagsReducer;