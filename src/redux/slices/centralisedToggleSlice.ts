import { createSlice } from "@reduxjs/toolkit";

export interface centralisedToggleState {
  value: boolean;
}

const initialState: centralisedToggleState = {
  value: false,
};

export const centralisedToggleSlice = createSlice({
  name: "centralisedToggle",
  initialState,
  reducers: {
    centralisedToggleFalse: (state: centralisedToggleState) => {
      state.value = false;
    },
    centralisedToggleTrue: (state: centralisedToggleState) => {
      state.value = true;
    },
    centralisedToggleChanging: (state: centralisedToggleState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  centralisedToggleFalse,
  centralisedToggleTrue,
  centralisedToggleChanging,
} = centralisedToggleSlice.actions;

export default centralisedToggleSlice;
