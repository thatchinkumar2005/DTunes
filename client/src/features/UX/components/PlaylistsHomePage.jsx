import React, { useEffect } from "react";
import useGetPlaylist from "../../Playlists/hooks/useGetPlaylist";
import { useInView } from "react-intersection-observer";
import Spinner from "../../../ui/components/Spinner";
import PlaylistCard from "../../Playlists/components/PlaylistCard";

export default function PlaylistsHomePage() {
  const {
    playlists,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useGetPlaylist();
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  return (
    <div className="h-48 md:h-64 w-full bg-primary rounded-lg p-3 disable-scrollbars grid grid-cols-3 md:grid-cols-4 gap-y-2 overflow-scroll">
      {isError && <div>{error}</div>}
      {isPending && <Spinner />}
      {isSuccess &&
        playlists.pages.map((page) =>
          page.data.map((playlist) => (
            <div
              key={playlist._id}
              className="flex justify-center items-center"
            >
              <PlaylistCard key={playlist._id} playlist={playlist} />
            </div>
          ))
        )}
      <div className="flex justify-center items-center text-center">
        <div ref={ref}>
          {hasNextPage ? <Spinner /> : "That's all the playlists"}
        </div>
      </div>
    </div>
  );
}
