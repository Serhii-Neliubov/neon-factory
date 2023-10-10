import { configureStore } from "@reduxjs/toolkit";
import { controlActiveSlice } from "./slices/ControlActiveSlice";

export const store = configureStore({
  reducer: {
    activeControl: controlActiveSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
