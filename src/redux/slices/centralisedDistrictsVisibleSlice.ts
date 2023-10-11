import { createSlice } from "@reduxjs/toolkit";

export interface centralisedDistrictsVisibleState {
  value: boolean;
}

const initialState: centralisedDistrictsVisibleState = {
  value: true,
};

export const centralisedDistrictsVisibleSlice = createSlice({
  name: "centralisedDistrictsVisible",
  initialState,
  reducers: {
    centralisedDistrictsVisibleFalse: (
      state: centralisedDistrictsVisibleState
    ) => {
      state.value = false;
    },
    centralisedDistrictsVisibleTrue: (
      state: centralisedDistrictsVisibleState
    ) => {
      state.value = true;
    },
    centralisedDistrictsVisibleChanging: (
      state: centralisedDistrictsVisibleState
    ) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  centralisedDistrictsVisibleFalse,
  centralisedDistrictsVisibleTrue,
  centralisedDistrictsVisibleChanging,
} = centralisedDistrictsVisibleSlice.actions;

export default centralisedDistrictsVisibleSlice.reducer;
