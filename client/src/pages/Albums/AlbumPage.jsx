import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Spinner from "../../ui/components/Spinner";
import { CiMenuKebab, CiPlay1 } from "react-icons/ci";

import useGetArtist from "../../features/Users/hooks/useGetUser";
import useGetAlbum from "../../features/Albums/hooks/useGetAlbum";
import useGetAlbumSongs from "../../features/Albums/hooks/useGetAlbumSongs";
import { useInView } from "react-intersection-observer";
import SongCard from "../../features/Songs/components/SongCard";
import { useDispatch } from "react-redux";
import {
  play,
  setCurrentSongs,
} from "../../features/MusicPlayer/slices/songsSlice";
import DropDown from "../../ui/components/DropDown";
import useAuth from "../../hooks/auth/useAuth";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

function DropDownMenu({ onClick }) {
  return <CiMenuKebab onClick={onClick} className="h-5 w-5" />;
}

export default function AlbumPage() {
  const { id } = useParams();
  const { auth } = useAuth();
  const [owner, setOwner] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const {
    data: album,
    isFetching: isGettingAlbum,
    isSuccess: isFetchedAlbum,
  } = useGetAlbum({ id });

  useEffect(() => {
    if (isFetchedAlbum) {
      setOwner(album.artist === auth.id);
    }
  }, [album, isFetchedAlbum, owner]);

  const {
    user,
    isFetching: isGettingArtist,
    isSuccess: isFetchedArtist,
  } = useGetArtist({
    id: album?.artist,
  });

  const {
    albumSongs,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useGetAlbumSongs({ id });

  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const dispatch = useDispatch();
  function handlePlayPause() {
    if (isPending) return;
    if (isSuccess && isFetchedAlbum) {
      if (albumSongs.pages[0].data.length) {
        dispatch(
          setCurrentSongs({
            songs: albumSongs.pages[0].data,
            clusterId: `/album/${id}`,
            clusterName: album?.name,
          })
        );
        dispatch(play());
      }
    }
  }

  return (
    <div className="flex flex-col overflow-scroll disable-scrollbars h-full w-full">
      {(isGettingArtist || isGettingAlbum) && <Spinner />}
      {isFetchedArtist && isFetchedAlbum && (
        <>
          <div className="flex justify-start w-full items-center p-2 h-52 border-b-2 border-primary">
            <div className="shrink-0 flex flex-col self-center">
              <img
                className="h-36 rounded-lg mb-3"
                src={album.files.coverArt}
              />
            </div>
            <div className=" h-full p-4 flex flex-col gap-2 justify-start grow shrink-0">
              <h1 className="text-3xl ">{album.name}</h1>
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
                  {owner && (
                    <DropDown
                      ToggleButton={DropDownMenu}
                      dir={"right"}
                      isOpen={isOpen}
                      setOpen={setOpen}
                    >
                      <div className="flex flex-col justify-center items-start gap-3 py-2 w-32">
                        <div className="flex gap-1 items-center justify-center">
                          <MdDelete className="fill-red-500" />
                          <span>Delete Playlist</span>
                        </div>
                        <div className="flex gap-1 items-center justify-center">
                          <IoMdAdd />
                          <Link
                            className="text-sm"
                            to={`/song/create/${album._id}`}
                          >
                            New Song
                          </Link>
                        </div>
                      </div>
                    </DropDown>
                  )}
                </div>
              </div>
              <span className="self-end text-sm text-gray-500">Album</span>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center grow p-3 ">
            <div className="w-[80%] rounded-lg grow overflow-scroll disable-scrollbars bg-secondary p-3">
              {isError && <div>{error}</div>}
              {isPending && <Spinner />}
              {isSuccess &&
                albumSongs.pages.map((page) =>
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
