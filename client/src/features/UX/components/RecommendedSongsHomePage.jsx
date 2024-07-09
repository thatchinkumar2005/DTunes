import React, { useEffect } from "react";
import SongCard from "../../Songs/components/SongCard";
import useRecommendation from "../../Songs/hooks/useRecommendation";
import Spinner from "../../../ui/components/Spinner";
import { useInView } from "react-intersection-observer";

export default function RecommendedSongsHomePage() {
  const { recommendedSongs, fetchNextPage, hasNextPage, status, error } =
    useRecommendation();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="h-48 w-full bg-primary rounded-lg p-3 flex flex-col gap-3 overflow-scroll disable-scrollbars">
      {status === "error" && <div>{error}</div>}
      {status === "pending" && <Spinner />}

      {status === "success" &&
        recommendedSongs.pages.map((page) =>
          page.data.map((song) => <SongCard key={song._id} song={song} />)
        )}
      <div ref={ref}>{hasNextPage ? <Spinner /> : "That's it from us"}</div>
    </div>
  );
}
