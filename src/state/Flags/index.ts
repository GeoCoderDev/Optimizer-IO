import { combineReducers } from "redux";
import sidebarIsOpenedSlice from "./sidebarIsOpenedSlice";
import usedKeyboardSlice from "./usedKeyboard";

const flagsReducer = combineReducers({
  sidebarIsOpened: sidebarIsOpenedSlice,
  usedKeyboard: usedKeyboardSlice,
});

export default flagsReducer;
