import { combineReducers } from "redux";
import windowWidthSlice from "./windowWidthSlice";
import windowHeightSlice from "./windowHeightSlice";
import headerHeightSlice from "@/state/ElementDimensions/headerHeight";

const elementsDimensionsReducer = combineReducers({
  windowWidth: windowWidthSlice,
  windowHeight: windowHeightSlice,
  headerHeight: headerHeightSlice,
});

export default elementsDimensionsReducer;
