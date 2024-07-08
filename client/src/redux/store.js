import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "../features/MusicPlayer/slices/songsSlice";

export const store = configureStore({
  reducer: {
    musicPlayer: musicPlayerReducer,
  },
});
