import { configureStore } from "@reduxjs/toolkit";
import { gameSliceReducer } from "../slices/gameSlice";

export const store = configureStore({
  reducer: {
    game: gameSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
