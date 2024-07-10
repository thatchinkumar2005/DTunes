import React, { useDebugValue, useEffect } from "react";
import useGetArtistSongs from "../hooks/useGetArtistSongs";

import { useInView } from "react-intersection-observer";
import Spinner from "../../../ui/components/Spinner";
import SongCard from "../../Songs/components/SongCard";

export default function UserPageSongs({ id }) {
  const {
    artistSongs,
    error,
    isError,
    isPending,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = useGetArtistSongs({ id });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  return (
    <div className="h-48 w-full bg-primary rounded-lg p-3 flex flex-col gap-3 overflow-scroll disable-scrollbars">
      {isError && <div>{error}</div>}
      {isPending && <Spinner />}
      {isSuccess &&
        artistSongs.pages.map((page) =>
          page.data.map((song) => <SongCard key={song._id} song={song} />)
        )}

      <div ref={ref} className="text-sm">
        {hasNextPage ? <Spinner /> : "Thats all the songs"}
      </div>
    </div>
  );
}
