import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface selectedDistrictsState {
  value: string[];
}

const initialState: selectedDistrictsState = {
  value: [],
};

export const selectedDistrictsSlice = createSlice({
  name: "selectedDistricts",
  initialState,
  reducers: {
    selectedDistrictsChanging: (
      state: selectedDistrictsState,
      action: PayloadAction<[]>
    ) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectedDistrictsChanging } = selectedDistrictsSlice.actions;

export default selectedDistrictsSlice.reducer;
