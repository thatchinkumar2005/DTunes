import React, { useEffect } from "react";
import useGetUserPlaylists from "../../Users/hooks/useGetUserPlaylists";
import { useInView } from "react-intersection-observer";
import useAuth from "../../../hooks/auth/useAuth";
import Spinner from "../../../ui/components/Spinner";

export default function PublicPlaylistsPopUp({
  handleSelectPlaylist,
  setOpen,
}) {
  const { auth } = useAuth();
  const {
    userPlaylists,
    isError,
    isPending,
    isSuccess,
    error: playlistsError,
    fetchNextPage,
    hasNextPage,
  } = useGetUserPlaylists({ id: auth.id });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="w-72 h-96 flex flex-col ">
      {isError && <div>{playlistsError}</div>}
      {isPending && <Spinner />}
      {isSuccess &&
        userPlaylists.pages.map((page) =>
          page.data.map((playlist) => (
            <div
              key={playlist._id}
              onClick={() => {
                handleSelectPlaylist(playlist);
                setOpen(false);
              }}
              className="h-14 w-full bg-secondary rounded-lg flex shrink-0 grow-0 justify-start items-center gap-3"
            >
              <img
                className="h-10 grow-0"
                src={
                  playlist?.like
                    ? "/LikedPlaylist.jpg"
                    : playlist?.files?.coverArt
                    ? playlist?.files?.coverArt
                    : "/Playlist.jpg"
                }
                alt="cover art"
              />
              <div className="w-32 h-12 grow-0 flex justify-start items-center hover:underline">
                {playlist.name.length > 20
                  ? `${playlist.name.slice(0, 19)}...`
                  : playlist.name}
              </div>
            </div>
          ))
        )}
      <div ref={ref}>{hasNextPage && <Spinner />}</div>
    </div>
  );
}
