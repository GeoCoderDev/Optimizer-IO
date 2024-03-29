import { ReduxPayload } from "@/interfaces/ReducersPayload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = 0.2;

const animationsDurationSlice = createSlice({
  name: "animationsDuration",
  initialState,
  reducers: {
    setAnimationsDuration(state, action: PayloadAction<ReduxPayload<number>>) {
      return action.payload.value;
    },
  },
});

export const { setAnimationsDuration } = animationsDurationSlice.actions;
export default animationsDurationSlice.reducer;
