import { createSlice } from "@reduxjs/toolkit";

export interface openTransportState {
  value: boolean;
}

const initialState: openTransportState = {
  value: true,
};

export const openTransportSlice = createSlice({
  name: "openTransport",
  initialState,
  reducers: {
    openTransportFalse: (state: openTransportState) => {
      state.value = false;
    },
    openTransportTrue: (state: openTransportState) => {
      state.value = true;
    },
    openTransportChanging: (state: openTransportState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openTransportTrue, openTransportFalse, openTransportChanging } =
  openTransportSlice.actions;

export default openTransportSlice.reducer;
