import { createSlice } from "@reduxjs/toolkit";

export interface showCadastreState {
  value: boolean;
}

const initialState: showCadastreState = {
  value: false,
};

export const showCadastreSlice = createSlice({
  name: "showCadastre",
  initialState,
  reducers: {
    showCadastreFalse: (state: showCadastreState) => {
      state.value = false;
    },
    showCadastreTrue: (state: showCadastreState) => {
      state.value = true;
    },
    showCadastreChanging: (state: showCadastreState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showCadastreTrue, showCadastreFalse, showCadastreChanging } =
  showCadastreSlice.actions;

export default showCadastreSlice.reducer;
