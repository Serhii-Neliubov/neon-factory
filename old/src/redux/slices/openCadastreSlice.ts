import { createSlice } from "@reduxjs/toolkit";

export interface openCadastreState {
  value: boolean;
}

const initialState: openCadastreState = {
  value: false,
};

export const openCadastreSlice = createSlice({
  name: "openCadastre",
  initialState,
  reducers: {
    openCadastreFalse: (state: openCadastreState) => {
      state.value = false;
    },
    openCadastreTrue: (state: openCadastreState) => {
      state.value = true;
    },
    openCadastreChanging: (state: openCadastreState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openCadastreTrue, openCadastreFalse, openCadastreChanging } =
  openCadastreSlice.actions;

export default openCadastreSlice.reducer;
