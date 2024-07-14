import React, { act, useEffect, useState } from "react";
import { CiMenuKebab, CiPlay1 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { play, setActiveSong } from "../../MusicPlayer/slices/songsSlice";
import useLike from "../hooks/useLike";
import useGetLikedBoolean from "../hooks/useGetLikedBoolean";
import { Link } from "react-router-dom";
import DropDown from "../../../ui/components/DropDown";
import Modal from "../../../ui/components/Modal";
import useGetAuthUserPlaylists from "../../Users/hooks/useGetAuthUserPlaylists";
import Spinner from "../../../ui/components/Spinner";
import PlaylistStrip from "../../Playlists/components/PlaylistStrip";
import { useInView } from "react-intersection-observer";

function DropDownMenu({ onClick }) {
  return <CiMenuKebab onClick={onClick} className="h-5 w-5" />;
}

function AddToPlaylistBtn({ onClick }) {
  return (
    <div onClick={onClick} className="text-sm text-center">
      Add To Playlist
    </div>
  );
}

export default function SongCard({ song }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  function handlePlayPause() {
    dispatch(setActiveSong({ song }));
    dispatch(play());
  }
  const { isLiked } = useGetLikedBoolean({ song: song._id });
  const { like, isLiking } = useLike();
  const {
    authUserPlaylists,
    isError,
    isPending,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    error,
  } = useGetAuthUserPlaylists();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
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
        <DropDown
          ToggleButton={DropDownMenu}
          isOpen={isDropDownOpen}
          setOpen={setIsDropDownOpen}
          className="top-3"
        >
          <div className="flex flex-col justify-center items-center w-32 h-8 ">
            <Modal
              ToggleElement={AddToPlaylistBtn}
              isOpen={isModalOpen}
              setOpen={setIsModalOpen}
            >
              <div className="w-72 h-96 flex flex-col ">
                {isPending && <Spinner />}
                {isError && <div>{error}</div>}
                {isSuccess &&
                  authUserPlaylists.pages.map((page) =>
                    page.data.map((playlist) => (
                      <PlaylistStrip
                        key={playlist._id}
                        playlist={playlist}
                        songId={song._id}
                      />
                    ))
                  )}
                <div ref={ref}>{hasNextPage && <Spinner />}</div>
              </div>
            </Modal>
          </div>
        </DropDown>
      </div>
    </div>
  );
}
