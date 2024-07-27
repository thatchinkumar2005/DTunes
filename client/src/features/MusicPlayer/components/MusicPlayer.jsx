import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import { CiPlay1 } from "react-icons/ci";
import { PiVinylRecordLight } from "react-icons/pi";
import { PiVinylRecordFill } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { play, playPause, setIsPlaying } from "../slices/songsSlice";
import { CiPause1 } from "react-icons/ci";
import { CiVolumeHigh } from "react-icons/ci";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { Link } from "react-router-dom";
import useQueue from "../hooks/useQueue";
import useSong from "../../Songs/hooks/useSong";
import useNextSong from "../hooks/useNextSong";
import { useQueryClient } from "@tanstack/react-query";
import usePrevSong from "../hooks/usePrevSong";
import useSocket from "../../../hooks/socket/useSocket";
import { socket } from "../../../socket/socket";
import useAuth from "../../../hooks/auth/useAuth";
import { current } from "@reduxjs/toolkit";

const MusicPlayerContext = createContext();
const MusicPlayer = () => {
  const queryClient = useQueryClient();
  const { queue, isSuccess: gotQueue } = useQueue();
  const { song, isSuccess: gotActiveSong } = useSong({
    id: queue?.currentSong,
  });
  const { nextSong } = useNextSong();
  const { prevSong } = usePrevSong();

  const socket = useSocket();
  const { auth } = useAuth();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [vol, setVol] = useState(0.3);

  const [dj, setDj] = useState(false);
  const dispatch = useDispatch();
  const isPlaying = useSelector((store) => store.musicPlayer.isPlaying);
  const [activeSong, setActiveSong] = useState(null);
  useEffect(() => {
    if (gotActiveSong && song && gotQueue) {
      console.log(queue);
      setActiveSong(song);
    }
  }, [gotActiveSong, setActiveSong, song, gotQueue, queue]);

  // const currentCluster = useSelector(
  //   (store) => store.musicPlayer.currentCluster
  // );
  // const currentClusterName = useSelector(
  //   (store) => store.musicPlayer.currentClusterName
  // );

  function handleDj(e) {
    setDj(!dj);
  }

  useEffect(() => {
    if (dj) {
      setCurrentTime(activeSong?.highlight?.from || 0);
      audioRef.current.currentTime = activeSong?.highlight?.from || 0;
    }
  }, [dj, activeSong]);
  useEffect(() => {
    if (dj) {
      const end = activeSong?.highlight?.to || 30;
      if (currentTime >= end) {
        nextSong(null, {
          onSuccess: () => {
            queryClient.invalidateQueries(["queue"]);
          },
        });
      }
    }
  }, [currentTime, dj, activeSong, queryClient, nextSong]);

  const [currentCluster, setCurrentCluster] = useState(null);
  const [currentClusterName, setCurrentClusterName] = useState(null);

  useEffect(() => {
    if (gotQueue && queue) {
      setCurrentCluster(queue?.clusterId);
      setCurrentClusterName(queue?.clusterName);
    }
  }, [gotQueue, queue]);

  useEffect(() => {
    socket.on("changeSong", (data) => {
      queryClient.invalidateQueries(["queue"]);
      dispatch(setIsPlaying(data.isPlaying));
      setCurrentTime(data.currentTime);
      if (audioRef.current) {
        audioRef.current.currentTime = data.currentTime;
      }
    });

    return () => {
      socket.off("changeSong");
    };
  }, [socket, queryClient, dispatch, audioRef]);

  useEffect(() => {
    socket.on("playback-data", (data) => {
      dispatch(setIsPlaying(data.isPlaying));
      setCurrentTime(data.currentTime);
      if (audioRef.current) {
        audioRef.current.currentTime = data.currentTime;
      }
    });
    return () => {
      socket.off("playback-data");
    };
  }, [socket, dispatch, audioRef]);

  // const { recommendedSongs, status } = useRecommendation();
  // useEffect(() => {
  //   // if (status === "success")
  //   // dispatch(setCurrentSongs({ songs: recommendedSongs.pages[0].data }));
  // }, [dispatch, status, recommendedSongs]);

  useEffect(() => {
    function handleSpace(e) {
      if (e.key === " ") {
        dispatch(playPause());
      } else if (e.key === "d" && vol > 0.01) {
        setVol((vol) => vol - 0.01);
      } else if (e.key === "u" && vol < 0.99) {
        setVol((vol) => vol + 0.01);
      }
    }

    document.addEventListener("keypress", handleSpace);

    return () => {
      document.removeEventListener("keypress", handleSpace);
    };
  });

  return (
    <MusicPlayerContext.Provider
      value={{
        auth,
        duration,
        setDuration,
        currentTime,
        setCurrentTime,
        vol,
        setVol,
        audioRef,
        isPlaying,
        activeSong,
        dispatch,
        currentCluster,
        currentClusterName,
        nextSong,
        prevSong,
        queryClient,
        socket,
      }}
    >
      <div className="bg-bg p-1 flex justify-center items-center overflow-hidden">
        <div className="flex bg-black flex-col justify-between w-full h-full rounded-lg ">
          <Player />
          <div className="w-full flex flex-row justify-between items-center p-1 grow-0">
            <Title />

            <div className="flex flex-row gap-2 justify-center items-center mr-6 md:mr-32">
              <PrevSong />
              <TogglePlayButton />
              <NextSong />
              {dj ? (
                <PiVinylRecordFill className="h-7 w-7" onClick={handleDj} />
              ) : (
                <PiVinylRecordLight className="h-7 w-7" onClick={handleDj} />
              )}
            </div>
            <div className="flex flex-col justify-center items-center mr-1 mt-1">
              <VolumeBar />
              <TimeStamp />
            </div>
          </div>

          <SeekBar />
        </div>
      </div>
    </MusicPlayerContext.Provider>
  );
};

function Player() {
  const {
    audioRef,
    activeSong,
    setCurrentTime,
    setDuration,
    isPlaying,
    vol,
    nextSong,
    socket,
    auth,
    dispatch,
    queryClient,
  } = useContext(MusicPlayerContext);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    audioRef.current.currentTime = 0;
  }, [activeSong, setDuration, setCurrentTime, audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioRef, activeSong]);

  useEffect(() => {
    audioRef.current.volume = vol;
  }, [vol]);

  function handleTimeUpdate() {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  }

  function handleOnEnded() {
    nextSong(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(["queue"]);
        dispatch(play());
        socket.emit("change-song", {
          userId: auth.id,
          playback: {
            isPlaying: true,
            currentTime: 0,
          },
        });
      },
    });
  }
  return (
    <audio
      ref={audioRef}
      src={activeSong?.files?.audio}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleTimeUpdate}
      onEnded={handleOnEnded}
    />
  );
}

function SeekBar() {
  const {
    currentTime,
    setCurrentTime,
    isPlaying,
    duration,
    audioRef,
    socket,
    auth,
  } = useContext(MusicPlayerContext);
  function handleSeek(e) {
    const seekTime = e.target.value;

    socket.emit("playback", {
      userId: auth.id,
      playback: {
        currentTime: seekTime,
        isPlaying,
      },
    });
    setCurrentTime(seekTime);
    audioRef.current.currentTime = seekTime;
  }
  return (
    <input
      className="w-full h-1 accent-red-500 mb-1 "
      type="range"
      value={currentTime}
      max={duration || 0}
      onChange={handleSeek}
    />
  );
}

function TogglePlayButton() {
  const { isPlaying, audioRef, socket, auth, currentTime } =
    useContext(MusicPlayerContext);
  const dispatch = useDispatch();
  function handleToggle() {
    if (audioRef.current) {
      socket.emit("playback", {
        userId: auth.id,
        playback: {
          isPlaying: !isPlaying,
          currentTime,
        },
      });
      dispatch(playPause());
    }
  }
  return (
    <div className="" onClick={handleToggle}>
      {isPlaying ? <CiPause1 size={28} /> : <CiPlay1 size={28} />}
    </div>
  );
}

function TimeStamp() {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  };
  const { currentTime, duration } = useContext(MusicPlayerContext);

  return (
    <div className="mt-3 ml-auto text-sm text-gray-500">{`${formatTime(
      currentTime
    )}/${formatTime(duration)}`}</div>
  );
}

function VolumeBar() {
  const { setVol, vol } = useContext(MusicPlayerContext);
  function handleVolume(e) {
    setVol(parseFloat(e.target.value));
  }
  return (
    <div className="flex flex-row items-center gap-2">
      <CiVolumeHigh />
      <input
        className="w-20 h-1"
        type="range"
        max={1}
        min={0}
        step={0.01}
        value={vol}
        onChange={handleVolume}
      />
    </div>
  );
}

function Title() {
  const { activeSong, currentCluster, currentClusterName } =
    useContext(MusicPlayerContext);

  return (
    <div className="flex flex-row gap-2 w-[150px] overflow-hidden ml-2 justify-start items-center md:w-[300px]">
      <div className="grow-0 shrink-0">
        <img className="h-12 rounded-lg " src={activeSong?.files?.coverArt} />
      </div>
      <div className="flex flex-col">
        <Link
          to={`/song/${activeSong?._id}`}
          className="grow-0 shrink-0 hover:underline"
        >
          {activeSong?.name.length > 11
            ? `${activeSong?.name.slice(0, 10)}...`
            : activeSong?.name}
        </Link>
        <Link className="text-xs hover:underline" to={currentCluster}>
          {`from ${currentClusterName}`.length > 14
            ? `from ${currentClusterName}`.slice(0, 13) + "..."
            : `from ${currentClusterName}`}
        </Link>
      </div>
    </div>
  );
}

function NextSong() {
  const { nextSong, queryClient, auth, socket, dispatch } =
    useContext(MusicPlayerContext);
  function handleClick() {
    nextSong(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(["queue"]);
        dispatch(play());
        socket.emit("change-song", {
          userId: auth.id,
          playback: {
            isPlaying: true,
            currentTime: 0,
          },
        });
      },
    });
  }
  return (
    <div onClick={handleClick}>
      <MdNavigateNext size={30} />
    </div>
  );
}

function PrevSong() {
  const { prevSong, queryClient, auth, socket, dispatch } =
    useContext(MusicPlayerContext);
  function handleClick() {
    prevSong(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(["queue"]);
        dispatch(play());
        socket.emit("change-song", {
          userId: auth.id,
          playback: {
            isPlaying: true,
            currentTime: 0,
          },
        });
      },
    });
  }
  return (
    <div onClick={handleClick}>
      <MdNavigateBefore size={30} />
    </div>
  );
}

export default MusicPlayer;
