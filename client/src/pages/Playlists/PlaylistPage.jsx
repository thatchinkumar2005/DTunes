import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../../ui/components/Spinner";

import useGetArtist from "../../features/Users/hooks/useGetUser";

import { useInView } from "react-intersection-observer";
import SongCard from "../../features/Songs/components/SongCard";

import useGetPlaylistSongs from "../../features/Playlists/hooks/useGetPlaylistSongs";
import useGetPlaylist from "../../features/Playlists/hooks/useGetPlaylist";
import { CiMenuKebab, CiPlay1 } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  play,
  setCurrentSongs,
} from "../../features/MusicPlayer/slices/songsSlice";
import DropDown from "../../ui/components/DropDown";
import useAuth from "../../hooks/auth/useAuth";

function DropDownMenu({ onClick }) {
  return <CiMenuKebab onClick={onClick} className="h-5 w-5" />;
}

export default function PlaylistPage() {
  const { id } = useParams();
  const { auth } = useAuth();
  const [owner, setOwner] = useState(false);

  const {
    data: playlist,
    isFetching: isGettingPlaylist,
    isSuccess: isFetchedPlaylist,
  } = useGetPlaylist({ id });

  useEffect(() => {
    if (isFetchedPlaylist) {
      setOwner(auth.id === playlist?.artist);
    }
  }, [playlist, owner, isFetchedPlaylist]);

  const {
    user,
    isFetching: isGettingArtist,
    isSuccess: isFetchedArtist,
  } = useGetArtist({
    id: playlist?.artist,
  });

  const {
    playlistSongs,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useGetPlaylistSongs({ id });

  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const dispatch = useDispatch();
  function handlePlayPause() {
    if (isPending) return;
    if (isSuccess && isFetchedPlaylist) {
      if (playlistSongs.pages[0].length) {
        dispatch(
          setCurrentSongs({
            songs: playlistSongs.pages[0].data,
            clusterId: `/playlist/${id}`,
            clusterName: playlist?.name,
          })
        );
        dispatch(play());
      }
    }
  }

  return (
    <div className="flex flex-col overflow-scroll disable-scrollbars h-full w-full">
      {(isGettingArtist || isGettingPlaylist) && <Spinner />}
      {isFetchedArtist && isFetchedPlaylist && (
        <>
          <div className="flex justify-start w-full items-center p-2 h-52 border-b-2 border-primary">
            <div className="shrink-0 flex flex-col self-center">
              <img
                className="h-36 rounded-lg mb-3"
                src={
                  playlist.like
                    ? "/LikedPlaylist.jpg"
                    : playlist?.files?.coverArt
                }
              />
            </div>
            <div className=" h-full p-4 flex flex-col gap-2 justify-start grow shrink-0">
              <h1 className="text-3xl ">{playlist.name}</h1>
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
                <div>
                  {owner && !playlist.like && (
                    <DropDown ToggleButton={DropDownMenu} dir={"right"}>
                      <div className="flex flex-col justify-center items-start gap-3 py-2 w-32">
                        <div className="flex gap-1 items-center justify-center">
                          <MdDelete className="fill-red-500" />
                          <span>Delete Playlist</span>
                        </div>
                      </div>
                    </DropDown>
                  )}
                </div>
              </div>
              <span className="self-end text-sm text-gray-500">Playlist</span>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center grow p-3 ">
            <div className="w-[80%] rounded-lg grow overflow-scroll disable-scrollbars bg-secondary p-3">
              {isError && <div>{error}</div>}
              {isPending && <Spinner />}
              {isSuccess &&
                playlistSongs.pages.map((page) =>
                  page.data.map((song) => (
                    <SongCard key={song._id} song={song} />
                  ))
                )}
              <div ref={ref}>{hasNextPage && <Spinner />}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
