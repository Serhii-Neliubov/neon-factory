import { createSlice } from "@reduxjs/toolkit";

export interface allDistrictsToggleState {
  value: boolean;
}

const initialState: allDistrictsToggleState = {
  value: false,
};

export const allDistrictsToggleSlice = createSlice({
  name: "allDistrictsToggle",
  initialState,
  reducers: {
    allDistrictsToggleFalse: (state: allDistrictsToggleState) => {
      state.value = false;
    },
    allDistrictsToggleTrue: (state: allDistrictsToggleState) => {
      state.value = true;
    },
    allDistrictsToggleChanging: (state: allDistrictsToggleState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  allDistrictsToggleFalse,
  allDistrictsToggleTrue,
  allDistrictsToggleChanging,
} = allDistrictsToggleSlice.actions;

export default allDistrictsToggleSlice.reducer;
