import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [
    {
      files: {
        audio:
          "http://localhost:7777/serverStorage/Songs/668937a10b547094c7b1af8b.mp3",
        coverArt:
          "http://localhost:7777/serverStorage/CoverArt/668937a10b547094c7b1af8b.png",
      },
      _id: "668937a10b547094c7b1af8b",
      name: "Sweet Home Alabama",
      artists: ["66893527709afbbe20927466"],
      album: "668935a3709afbbe20927475",
      genre: ["pop"],
      releaseDate: "2024-07-06T12:25:05.806Z",
      __v: 0,
    },
    {
      files: {
        audio:
          "http://localhost:7777/serverStorage/Songs/66893791523d7b82f3490eca.mp3",
        coverArt:
          "http://localhost:7777/serverStorage/CoverArt/66893791523d7b82f3490eca.png",
      },
      _id: "66893791523d7b82f3490eca",
      name: "Not Like Us",
      artists: ["66893527709afbbe20927466"],
      album: "668935a3709afbbe20927475",
      genre: ["pop"],
      releaseDate: "2024-07-06T12:24:49.144Z",
      __v: 0,
    },
    {
      files: {
        audio:
          "http://localhost:7777/serverStorage/Songs/6689382f16474fe0a49fba37.mp3",
        coverArt:
          "http://localhost:7777/serverStorage/CoverArt/6689382f16474fe0a49fba37.png",
      },
      _id: "6689382f16474fe0a49fba37",
      name: "Fein 2",
      artists: ["6689350d709afbbe20927460"],
      album: "6689380ae1003d1d5ec6eb2a",
      genre: ["pop"],
      releaseDate: "2024-07-06T12:27:27.177Z",
      __v: 0,
    },
  ],
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
      state.activeSong =
        action?.payload?.song || state.currentSongs[state.currentIndex];
    },

    playPause: (state, action) => {
      if (!state.activeSong) {
        state.activeSong = state.currentSongs[state.currentIndex];
      }
      state.isPlaying = !state.isPlaying;
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
  },
});

const musicPlayerReducer = musicPlayerSlice.reducer;
export default musicPlayerReducer;
export const { setActiveSong, playPause, nextSong, prevSong } =
  musicPlayerSlice.actions;
