import { createSlice } from "@reduxjs/toolkit";

export interface centralisedDistrictState {
  value: boolean;
}

const initialState: centralisedDistrictState = {
  value: false,
};

export const centralisedDistrictSlice = createSlice({
  name: "centralisedDistrict",
  initialState,
  reducers: {
    centralisedDistrictFalse: (state: centralisedDistrictState) => {
      state.value = false;
    },
    centralisedDistrictTrue: (state: centralisedDistrictState) => {
      state.value = true;
    },
    centralisedDistrictChanging: (state: centralisedDistrictState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  centralisedDistrictTrue,
  centralisedDistrictFalse,
  centralisedDistrictChanging,
} = centralisedDistrictSlice.actions;

export default centralisedDistrictSlice.reducer;
