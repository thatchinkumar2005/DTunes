import React, { useState, useRef, useEffect } from "react";
import { CiPlay1 } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { playPause } from "../slices/songsSlice";
import { CiPause1 } from "react-icons/ci";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const isPlaying = useSelector((store) => store.musicPlayer.isPlaying);
  const activeSong = useSelector((store) => store.musicPlayer.activeSong);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const dispatch = useDispatch();

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    setCurrentTime(0);
  }, [activeSong]);

  if (audioRef.current) {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  const togglePlay = () => {
    dispatch(playPause());
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="bg-primary flex flex-row justify-center items-center">
      <audio
        ref={audioRef}
        src={activeSong?.files?.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />
      <div className="flex flex-row justify-center items-center">
        <button onClick={togglePlay}>
          {isPlaying ? <CiPause1 /> : <CiPlay1 />}
        </button>
        <input
          className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
          type="range"
          value={currentTime}
          max={duration || 0}
          onChange={handleSeek}
        />
        <div>{`${formatTime(currentTime)}/${formatTime(duration)}`}</div>
      </div>
    </div>
  );
};

export default MusicPlayer;
