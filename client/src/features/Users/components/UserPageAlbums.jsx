import React, { useEffect } from "react";
import useGetArtistAlbums from "../hooks/useGetArtistAlbums";
import { useInView } from "react-intersection-observer";
import Spinner from "../../../ui/components/Spinner";
import AlbumCard from "../../Albums/components/AlbumCard";

export default function UserPageAlbums({ id }) {
  const {
    userAlbums,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useGetArtistAlbums({ id });
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
        userAlbums.pages.map((page) =>
          page.data.map((album) => (
            <div className="flex justify-center items-center" key={album._id}>
              <AlbumCard album={album} />
            </div>
          ))
        )}

      <div className="flex justify-center items-center text-center">
        <div ref={ref}>
          {hasNextPage ? <Spinner /> : "That's all the albums"}
        </div>
      </div>
    </div>
  );
}
