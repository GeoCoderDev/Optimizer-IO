import { ReduxPayload } from "@/interfaces/ReducersPayload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = 150;

const headerHeightSlice = createSlice({
  name: "headerHeight",
  initialState,
  reducers: {
    setHeaderHeight(state, action: PayloadAction<ReduxPayload<number>>) {
      return action.payload.value;
    },
  },
});

export const { setHeaderHeight } = headerHeightSlice.actions;
export default headerHeightSlice.reducer;
