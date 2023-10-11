import { createSlice } from "@reduxjs/toolkit";

export interface decentralisedToggleState {
  value: boolean;
}

const initialState: decentralisedToggleState = {
  value: false,
};

export const decentralisedToggleSlice = createSlice({
  name: "decentralisedDistrictsVisible",
  initialState,
  reducers: {
    decentralisedToggleFalse: (state: decentralisedToggleState) => {
      state.value = false;
    },
    decentralisedToggleTrue: (state: decentralisedToggleState) => {
      state.value = true;
    },
    decentralisedToggleChanging: (state: decentralisedToggleState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  decentralisedToggleFalse,
  decentralisedToggleTrue,
  decentralisedToggleChanging,
} = decentralisedToggleSlice.actions;

export default decentralisedToggleSlice.reducer;
