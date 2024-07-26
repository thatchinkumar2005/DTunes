import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    playPause: (state, action) => {
      state.isPlaying = !state.isPlaying;
    },
    play: (state, action) => {
      state.isPlaying = false;
      state.isPlaying = true;
    },
    // nextSong: (state, action) => {
    //   state.currentIndex =
    //     state.currentIndex === state.currentSongs.length - 1
    //       ? 0
    //       : state.currentIndex + 1;
    //   state.activeSong = state.currentSongs[state.currentIndex];
    //   state.isPlaying = true;
    // },
    // prevSong: (state, action) => {
    //   state.currentIndex =
    //     state.currentIndex === 0
    //       ? state.currentSongs.length - 1
    //       : state.currentIndex - 1;
    //   state.activeSong = state.currentSongs[state.currentIndex];
    //   state.isPlaying = true;
    // },
  },
});

const musicPlayerReducer = musicPlayerSlice.reducer;
export default musicPlayerReducer;
export const { playPause, play } = musicPlayerSlice.actions;
