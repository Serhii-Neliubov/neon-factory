import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface controlActiveState {
  value: boolean;
}

const initialState: controlActiveState = {
  value: false,
};

export const controlActiveSlice = createSlice({
  name: "activeControl",
  initialState,
  reducers: {
    controlActiveFalse: (state: controlActiveState) => {
      state.value = false;
    },
    controlActiveTrue: (state: controlActiveState) => {
      state.value = true;
    },
    controlActiveChanging: (state: controlActiveState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { controlActiveTrue, controlActiveFalse, controlActiveChanging } =
  controlActiveSlice.actions;

export default controlActiveSlice.reducer;
