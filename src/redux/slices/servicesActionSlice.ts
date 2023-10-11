import { createSlice } from "@reduxjs/toolkit";

export interface servicesActionState {
  value: boolean;
}

const initialState: servicesActionState = {
  value: false,
};

export const servicesActionSlice = createSlice({
  name: "servicesAction",
  initialState,
  reducers: {
    servicesActionFalse: (state: servicesActionState) => {
      state.value = false;
    },
    servicesActionTrue: (state: servicesActionState) => {
      state.value = true;
    },
    servicesActionChanging: (state: servicesActionState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  servicesActionFalse,
  servicesActionTrue,
  servicesActionChanging,
} = servicesActionSlice.actions;

export default servicesActionSlice.reducer;
