import { createSlice } from "@reduxjs/toolkit";

export interface decentralisedDistrictsVisibleState {
  value: boolean;
}

const initialState: decentralisedDistrictsVisibleState = {
  value: true,
};

export const decentralisedDistrictsVisibleSlice = createSlice({
  name: "decentralisedDistrictsVisible",
  initialState,
  reducers: {
    decentralisedDistrictsVisibleFalse: (
      state: decentralisedDistrictsVisibleState
    ) => {
      state.value = false;
    },
    decentralisedDistrictsVisibleTrue: (
      state: decentralisedDistrictsVisibleState
    ) => {
      state.value = true;
    },
    decentralisedDistrictsVisibleChanging: (
      state: decentralisedDistrictsVisibleState
    ) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  decentralisedDistrictsVisibleFalse,
  decentralisedDistrictsVisibleTrue,
  decentralisedDistrictsVisibleChanging,
} = decentralisedDistrictsVisibleSlice.actions;

export default decentralisedDistrictsVisibleSlice.reducer;
