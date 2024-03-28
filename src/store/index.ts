import headerHeightSlice from "@/state/ElementsDimensions/headerHeight";
import windowWidthSlice from "@/state/ElementsDimensions/windowWidthSlice";
import windowHeightSlice from "@/state/ElementsDimensions/windowHeightSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sidebarIsOpenedSlice from "@/state/Flags/sidebarIsOpenedSlice";
// Importa otros reductores

const rootReducer = combineReducers({
  windowWidth: windowWidthSlice,
  windowHeight: windowHeightSlice,
  headerHeight: headerHeightSlice,
  sidebarIsOpened: sidebarIsOpenedSlice 
});

const store = configureStore({ reducer: rootReducer });

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
