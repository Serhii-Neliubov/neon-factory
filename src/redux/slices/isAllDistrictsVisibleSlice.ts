import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface isAllDistrictsVisibleState {
  value: boolean;
}

const initialState: isAllDistrictsVisibleState = {
  value: true,
};

export const isAllDistrictsVisibleSlice = createSlice({
  name: "isAllDistrictsVisible",
  initialState,
  reducers: {
    changeDistrictTrue: (state) => {
      state.value = true;
    },
    changeDistrictValue: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeDistrictValue, changeDistrictTrue } =
  isAllDistrictsVisibleSlice.actions;

export default isAllDistrictsVisibleSlice.reducer;
