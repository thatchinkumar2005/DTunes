import React from "react";
import { useParams } from "react-router-dom";
import useSong from "../../features/Songs/hooks/useSong";
import Spinner from "../../ui/components/Spinner";
import { CiPlay1 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import useGetArtist from "../../features/Users/hooks/useGetUser";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import useGetLikedBoolean from "../../features/Songs/hooks/useGetLikedBoolean";
import useLike from "../../features/Songs/hooks/useLike";
import {
  play,
  setActiveSong,
} from "../../features/MusicPlayer/slices/songsSlice";

export default function SongPage() {
  const { id } = useParams();
  const {
    song,
    isFetching: isGettingSong,
    isSuccess: isFetchedSong,
  } = useSong({ id });

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  function handlePlayPause() {
    dispatch(setActiveSong({ song }));
    dispatch(play());
  }

  const { isLiked } = useGetLikedBoolean({ song: song?._id });
  const { like } = useLike();

  function handleLike() {
    like(song._id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["isLiked", song?._id]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  const {
    user,
    isFetching: isGettingArtist,
    isSuccess: isFetchedArtist,
  } = useGetArtist({
    id: song?.artists[0],
  });

  return (
    <div className="flex flex-col overflow-scroll disable-scrollbars h-full w-full">
      {isGettingArtist || (isGettingSong && <Spinner />)}
      {isFetchedArtist && isFetchedSong && (
        <>
          <div className="flex justify-start w-full items-center p-3 h-52 border-b-2 border-primary">
            <div className="shrink-0 flex flex-col">
              <img className="h-36 rounded-lg" src={song.files.coverArt} />
            </div>
            <div className=" h-full p-4 flex flex-col gap-2 justify-start grow shrink-0">
              <h1 className="text-3xl ">{song.name}</h1>
              <span className="text-sm self-start text-gray-500">
                {user.fname}
              </span>
              <div className="mt-7 flex justify-start gap-10 items-center">
                <div className="bg-primary rounded-full h-12 w-12 flex justify-center items-center  hover:bg-slate-500">
                  <CiPlay1
                    onClick={handlePlayPause}
                    className="h-10 w-10 ml-2"
                  />
                </div>
                <FaHeart
                  onClick={handleLike}
                  className={`h-5 w-5 self-end mb-2 ${
                    isLiked ? "fill-blue-500" : "fill-white"
                  }`}
                />
                <CiMenuKebab className="h-5 w-5 self-end mb-2" />
              </div>
              <span></span>
            </div>
          </div>

          <div className="flex justify-center grow flex-col items-center overflow-scroll p-3 disable-scrollbars">
            <p className="w-[80%] rounded-lg grow overflow-scroll disable-scrollbars bg-secondary text-2xl p-3 whitespace-pre-line disable-scrollbars">
              {song.lyric ? song.lyric : "No Lyric Found"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
