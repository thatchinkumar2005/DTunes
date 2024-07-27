import { useEffect, useRef, useState } from "react";
import { CiPlay1 } from "react-icons/ci";

function DjModeEditPopUp({ preview, setStart, setEnd, start, end }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef();
  function handleTimeUpdate(e) {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  }

  function handleSeek(e) {
    const seekTime = e.target.value;
    setCurrentTime(seekTime);
    audioRef.current.currentTime = seekTime;
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="h-64 w-72 flex flex-col items-center gap-3 p-2">
      <h1 className="text-xl">DJ Highlights</h1>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        src={preview}
        loop
      ></audio>
      <CiPlay1
        className="self-start"
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      />
      <input
        type="range"
        max={duration || 0}
        value={currentTime}
        onChange={handleSeek}
        className="h-1 w-full"
      />

      <span className="self-end bg-primary p-0.5 rounded-md px-2">
        {formatTime(currentTime)}
      </span>

      <div className="flex gap-5">
        <button
          className="w-20 h-10 rounded-lg bg-button disabled:opacity-75"
          onClick={() => {
            setStart(currentTime);
          }}
          disabled={currentTime >= end}
        >
          Set Start
        </button>
        <button
          className="w-20 h-10 rounded-lg bg-button disabled:opacity-75 "
          onClick={() => {
            setEnd(currentTime);
          }}
          disabled={currentTime <= start}
        >
          Set End
        </button>
      </div>

      <div className="flex gap-5">
        <div className="w-20 h-10 rounded-lg bg-primary flex justify-center items-center">
          Start: {formatTime(start)}
        </div>
        <div className="w-20 h-10 rounded-lg bg-primary flex justify-center items-center">
          End: {formatTime(end)}
        </div>
      </div>
    </div>
  );
}

export default DjModeEditPopUp;
