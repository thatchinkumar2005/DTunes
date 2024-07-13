import React, { useEffect } from "react";
import UserCard from "../../Users/components/UserCard";
import useGetArtists from "../../Users/hooks/useGetArtists";
import Spinner from "../../../ui/components/Spinner";
import { useInView } from "react-intersection-observer";

export default function TopArtistsHomePage() {
  const {
    artists,
    hasNextPage,
    fetchNextPage,
    isError,
    isPending,
    isSuccess,
    error,
  } = useGetArtists();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  return (
    <div className="h-32 md:h-40 w-full bg-primary rounded-lg p-3 disable-scrollbars grid grid-cols-3 auto-rows-min md:grid-cols-4 gap-y-2 overflow-scroll">
      {isError && <div>{error}</div>}
      {isPending && <Spinner />}
      {isSuccess &&
        artists.pages.map((page) =>
          page.data.map((artist) => (
            <div key={artist._id} className="flex justify-center items-center">
              <UserCard key={artist._id} user={artist} />
            </div>
          ))
        )}
      <div className="flex justify-center items-center text-center">
        <div ref={ref}>{hasNextPage ? <Spinner /> : "That's it from us"}</div>
      </div>
    </div>
  );
}
