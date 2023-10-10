import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface mapState {
  value: any;
}

const initialState: mapState = {
  value: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    changeMapValue: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { changeMapValue } = mapSlice.actions;

export default mapSlice.reducer;
