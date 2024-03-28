import { ReduxPayload } from "@/interfaces/ReducersPayload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = 0;

const windowHeightSlice = createSlice({
  name: "windowHeight",
  initialState,
  reducers: {
    setWindowHeight(state, action: PayloadAction<ReduxPayload<number>>) {
      return action.payload.value;
    },
  },
});

export const { setWindowHeight } = windowHeightSlice.actions;
export default windowHeightSlice.reducer;
