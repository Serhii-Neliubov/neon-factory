import { createSlice } from "@reduxjs/toolkit";

export interface openBrusselsState {
  value: boolean;
}

const initialState: openBrusselsState = {
  value: false,
};

export const openBrusselsSlice = createSlice({
  name: "openBrussels",
  initialState,
  reducers: {
    openBrusselsFalse: (state: openBrusselsState) => {
      state.value = false;
    },
    openBrusselsTrue: (state: openBrusselsState) => {
      state.value = true;
    },
    openBrusselsChanging: (state: openBrusselsState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openBrusselsTrue, openBrusselsFalse, openBrusselsChanging } =
  openBrusselsSlice.actions;

export default openBrusselsSlice.reducer;
