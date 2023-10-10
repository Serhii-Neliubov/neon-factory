import { createSlice } from "@reduxjs/toolkit";

export interface openBrusselsState {
  value: boolean;
}

const initialState: openBrusselsState = {
  value: false,
};

export const mapStyleButtonSlice = createSlice({
  name: "mapStyleButton",
  initialState,
  reducers: {
    mapStyleButtonFalse: (state: openBrusselsState) => {
      state.value = false;
    },
    mapStyleButtonTrue: (state: openBrusselsState) => {
      state.value = true;
    },
    mapStyleButtonChanging: (state: openBrusselsState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  mapStyleButtonTrue,
  mapStyleButtonFalse,
  mapStyleButtonChanging,
} = mapStyleButtonSlice.actions;

export default mapStyleButtonSlice.reducer;
