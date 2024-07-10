import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [],
  currentPlaylist: {},
  playedSongs: [],
  currentIndex: 0,
  shuffle: false,
  activeSong: null,
  isPlaying: false,
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      if (action?.payload?.song) {
        console.log("yes");
        state.activeSong = action.payload.song;
        return;
      } else {
        state.activeSong = state.currentSongs[state.currentIndex];
      }
    },

    playPause: (state, action) => {
      // if (!state.activeSong) {
      //   state.activeSong = state.currentSongs[state.currentIndex];
      // }
      if (state.activeSong) state.isPlaying = !state.isPlaying;
    },
    play: (state, action) => {
      state.isPlaying = false;
      state.isPlaying = true;
    },
    nextSong: (state, payload) => {
      state.currentIndex =
        state.currentIndex === state.currentSongs.length - 1
          ? 0
          : state.currentIndex + 1;
      state.activeSong = state.currentSongs[state.currentIndex];
    },
    prevSong: (state, action) => {
      state.currentIndex =
        state.currentIndex === 0
          ? state.currentSongs.length - 1
          : state.currentIndex - 1;
      state.activeSong = state.currentSongs[state.currentIndex];
    },
    setCurrentSongs: (state, action) => {
      state.currentSongs = action.payload;
      state.currentIndex = 0;
      state.activeSong = state.currentSongs[state.currentIndex];
    },
  },
});

const musicPlayerReducer = musicPlayerSlice.reducer;
export default musicPlayerReducer;
export const {
  setActiveSong,
  playPause,
  nextSong,
  prevSong,
  play,
  setCurrentSongs,
} = musicPlayerSlice.actions;
