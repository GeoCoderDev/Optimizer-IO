import { combineReducers, configureStore } from "@reduxjs/toolkit";

import elementsDimensionsReducer from "@/state/ElementDimensions";
import flagsReducer from "@/state/Flags";
import globalConstantsReducer from "@/state/Constants";

const rootReducer = combineReducers({
  elementsDimensions: elementsDimensionsReducer,
  flags: flagsReducer,
  globalConstants: globalConstantsReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
