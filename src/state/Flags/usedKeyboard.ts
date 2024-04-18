import { ReduxPayload } from "@/interfaces/ReducersPayload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = false;

const usedKeyboardSlice = createSlice({
  name: "usedKeyboard",
  initialState,
  reducers: {
    setUsedKeyboard(state, action: PayloadAction<ReduxPayload<boolean>>) {
      return action.payload.value;
    },
  },
});

export const { setUsedKeyboard } = usedKeyboardSlice.actions;
export default usedKeyboardSlice.reducer;
