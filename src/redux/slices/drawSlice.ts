import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface drawState {
  value: any;
}

const initialState: drawState = {
  value: null,
};

export const drawSlice = createSlice({
  name: "draw",
  initialState,
  reducers: {
    changeDrawValue: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { changeDrawValue } = drawSlice.actions;

export default drawSlice.reducer;
