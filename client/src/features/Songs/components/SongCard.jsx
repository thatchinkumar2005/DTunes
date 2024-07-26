import React from "react";
import { CiMenuKebab, CiPlay1 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { play } from "../../MusicPlayer/slices/songsSlice";
import useLike from "../hooks/useLike";
import useGetLikedBoolean from "../hooks/useGetLikedBoolean";
import { Link, useResolvedPath } from "react-router-dom";
import DropDown from "../../../ui/components/DropDown";
import SongCardDropDown from "./SongCardDropDown";
import usePlaySong from "../hooks/usePlaySong";

function DropDownMenu({ onClick }) {
  return <CiMenuKebab onClick={onClick} className="h-5 w-5" />;
}

export default function SongCard({ song }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { play: playApi } = usePlaySong();
  function handlePlayPause() {
    playApi(song._id, {
      onSuccess: (respData) => {
        // console.log(song);
        // dispatch(setActiveSong({ song }));
        // dispatch(play());
        queryClient.invalidateQueries(["queue"]);
      },
    });
  }
  const { isLiked } = useGetLikedBoolean({ song: song._id });
  const { like, isLiking } = useLike();

  function handleLike() {
    like(song._id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["isLiked"]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }
  return (
    <div className="h-14 w-full bg-secondary rounded-lg flex shrink-0 grow-0 justify-between items-center">
      <div className="flex gap-2 justify-center items-center grow-0 overflow-hidden ml-2">
        <img
          className="h-10 grow-0"
          src={song?.files?.coverArt}
          alt="cover art"
        />
        <Link
          to={`/song/${song._id}`}
          className="w-32 h-12 grow-0 flex justify-start items-center hover:underline"
        >
          {song.name.length > 15 ? `${song.name.slice(0, 14)}...` : song.name}
        </Link>
      </div>
      <div className="flex justify-center items-center gap-2 mr-2">
        <CiPlay1 onClick={handlePlayPause} className=" h-5 w-5" />
        <div onClick={handleLike}>
          <FaHeart className={isLiked ? "fill-blue-500" : "fill-white"} />
        </div>
        <DropDown ToggleButton={DropDownMenu} className="top-3" song={song}>
          <SongCardDropDown />
        </DropDown>
      </div>
    </div>
  );
}
