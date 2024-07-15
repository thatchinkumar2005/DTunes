import React, { useEffect } from "react";
import useGetAuthUserPlaylists from "../../Users/hooks/useGetAuthUserPlaylists";
import { useInView } from "react-intersection-observer";
import PlaylistStrip from "./PlaylistStrip";
import Spinner from "../../../ui/components/Spinner";

export default function PlaylistsListPopUp({ song }) {
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
  return (
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
  );
}
