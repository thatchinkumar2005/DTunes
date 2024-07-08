import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [],
  playedSongs: [],
  currentIndex: 0,
  shuffle: false,
  activeSong: {
    files: {
      audio:
        "http://localhost:7777/serverStorage/Songs/66893791523d7b82f3490eca.mp3",
    },
  },
  isPlaying: false,
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      if (
        state.currentSongs.find((song) => song._id === action.payload.song._id)
      ) {
        if (
          !state.playedSongs.find(
            (song) => song._id === action.payload.song._id
          )
        ) {
          state.playedSongs.push(action.payload.song);
        }
      }
    },

    playPause: (state, action) => {
      if (!state.activeSong) {
        state.isPlaying = false;
        return;
      }
      state.isPlaying = !state.isPlaying;
    },
  },
});

const musicPlayerReducer = musicPlayerSlice.reducer;
export default musicPlayerReducer;
export const { setActiveSong, playPause } = musicPlayerSlice.actions;
