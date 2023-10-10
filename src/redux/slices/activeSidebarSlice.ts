import { createSlice } from "@reduxjs/toolkit";

export interface activeSidebarState {
  value: boolean;
}

const initialState: activeSidebarState = {
  value: true,
};

export const activeSidebarSlice = createSlice({
  name: "activeSidebar",
  initialState,
  reducers: {
    activeSidebarFalse: (state: activeSidebarState) => {
      state.value = false;
    },
    activeSidebarTrue: (state: activeSidebarState) => {
      state.value = true;
    },
    activeSidebarChanging: (state: activeSidebarState) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { activeSidebarTrue, activeSidebarFalse, activeSidebarChanging } =
  activeSidebarSlice.actions;

export default activeSidebarSlice.reducer;
