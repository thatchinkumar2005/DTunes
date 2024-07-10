import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "../../../ui/components/Spinner";
import useGetUserPlaylists from "../hooks/useGetUserPlaylists";
import PlaylistCard from "../../Playlists/components/PlaylistCard";

export default function UserPagePlaylists({ id }) {
  const {
    userPlaylists,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useGetUserPlaylists({ id });
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  return (
    <div className="h-48 md:h-64 w-full bg-primary rounded-lg p-3 disable-scrollbars grid grid-cols-3 md:grid-cols-4 gap-y-2 overflow-scroll">
      {isError && <div>{error}</div>}
      {isPending && <Spinner />}
      {isSuccess &&
        userPlaylists.pages.map((page) =>
          page.data.map((playlist) => (
            <div
              className="flex justify-center items-center"
              key={playlist._id}
            >
              <PlaylistCard playlist={playlist} />
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
