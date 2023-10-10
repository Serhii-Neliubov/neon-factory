import { configureStore } from "@reduxjs/toolkit";
import { controlActiveSlice } from "./slices/ControlActiveSlice";
import mapSlice from "./slices/mapSlice";
import openBrusselsSlice from "./slices/openBrusselsSlice";
import activeSidebarSlice from "./slices/activeSidebarSlice";
import openTransportSlice from "./slices/openTransportSlice";
import openCadastreSlice from "./slices/openCadastreSlice";
import showCadastreSlice from "./slices/showCadastreSlice";
import drawSlice from "./slices/drawSlice";
import mapStyleButtonSlice from "./slices/mapStyleButtonSlice";
import sqmSlice from "./slices/sqmSlice";
import selectedDistrictsSlice from "./slices/selectedDistrictsSlice";
import { centralisedDistrictSlice } from "./slices/centralisedDistrictSliceActive";
import showTransportSlice from "./slices/showTransportSlice";

export const store = configureStore({
  reducer: {
    activeControl: controlActiveSlice.reducer,
    activeSidebar: activeSidebarSlice,
    map: mapSlice,
    openBrussels: openBrusselsSlice,
    openTransport: openTransportSlice,
    openCadastre: openCadastreSlice,
    showCadastre: showCadastreSlice,
    draw: drawSlice,
    mapStyleButton: mapStyleButtonSlice,
    sqm: sqmSlice,
    selectedDistricts: selectedDistrictsSlice,
    centralisedDistrict: centralisedDistrictSlice.reducer,
    showTransport: showTransportSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
