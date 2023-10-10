import { createSlice } from "@reduxjs/toolkit";

export interface showTransportState {
  value: boolean;
}

const initialState: showTransportState = {
  value: true,
};

export const showTransportSlice = createSlice({
  name: "showTransport",
  initialState,
  reducers: {
    showTransportFalse: (state: showTransportState) => {
      state.value = false;
    },
    showTransportTrue: (state: showTransportState) => {
      state.value = true;
    },
    showTransportChanging: (state: showTransportState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showTransportTrue, showTransportFalse, showTransportChanging } =
  showTransportSlice.actions;

export default showTransportSlice.reducer;
