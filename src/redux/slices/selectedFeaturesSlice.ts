import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface selectedFeaturesState {
  value: any[];
}

const initialState: selectedFeaturesState = {
  value: [],
};

export const openTransportSlice = createSlice({
  name: "selectedFeatures",
  initialState,
  reducers: {
    selectedFeaturesChanging: (
      state: selectedFeaturesState,
      action: PayloadAction<any[]>
    ) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectedFeaturesChanging } = openTransportSlice.actions;

export default openTransportSlice.reducer;
