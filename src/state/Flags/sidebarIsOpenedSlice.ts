import { ReduxPayload } from "@/interfaces/ReducersPayload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = false;

const sidebarIsOpenedSlice = createSlice({
  name: "sidebarIsOpened",
  initialState,
  reducers: {
    switchSidebarIsOpened(state, action) {
      return !state;
    },
    setSidebarIsOpened(state, action: PayloadAction<ReduxPayload<boolean>>) {
      return action.payload.value;
    },
  },
});

export const { setSidebarIsOpened, switchSidebarIsOpened } =
  sidebarIsOpenedSlice.actions;
export default sidebarIsOpenedSlice.reducer;
