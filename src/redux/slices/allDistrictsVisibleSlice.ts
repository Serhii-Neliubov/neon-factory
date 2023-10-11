import { createSlice } from "@reduxjs/toolkit";

export interface allDistrictsVisibleState {
  value: boolean;
}

const initialState: allDistrictsVisibleState = {
  value: true,
};

export const allDistrictsVisibleSlice = createSlice({
  name: "allDistrictsVisible",
  initialState,
  reducers: {
    allDistrictsVisibleFalse: (state: allDistrictsVisibleState) => {
      state.value = false;
    },
    allDistrictsVisibleTrue: (state: allDistrictsVisibleState) => {
      state.value = true;
    },
    allDistrictsVisibleChanging: (state: allDistrictsVisibleState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  allDistrictsVisibleFalse,
  allDistrictsVisibleTrue,
  allDistrictsVisibleChanging,
} = allDistrictsVisibleSlice.actions;

export default allDistrictsVisibleSlice.reducer;
