import { createSlice } from "@reduxjs/toolkit";

export interface allDistrictsSelectedState {
  value: boolean;
}

const initialState: allDistrictsSelectedState = {
  value: false,
};

export const allDistrictsSelectedSlice = createSlice({
  name: "allDistrictsSelected",
  initialState,
  reducers: {
    allDistrictsSelectedFalse: (state: allDistrictsSelectedState) => {
      state.value = false;
    },
    allDistrictsSelectedTrue: (state: allDistrictsSelectedState) => {
      state.value = true;
    },
    allDistrictsSelectedChanging: (state: allDistrictsSelectedState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  allDistrictsSelectedFalse,
  allDistrictsSelectedTrue,
  allDistrictsSelectedChanging,
} = allDistrictsSelectedSlice.actions;

export default allDistrictsSelectedSlice.reducer;
