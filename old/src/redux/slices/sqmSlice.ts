import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface sqmState {
  value: number;
}

const initialState: sqmState = {
  value: 0,
};

export const sqmSlice = createSlice({
  name: "sqm",
  initialState,
  reducers: {
    changeSqmValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSqmValue } = sqmSlice.actions;

export default sqmSlice.reducer;
