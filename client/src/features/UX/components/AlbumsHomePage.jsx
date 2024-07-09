import React, { useEffect } from "react";
import useGetAlbums from "../../Albums/hooks/useGetAlbums";
import { useInView } from "react-intersection-observer";
import Spinner from "../../../ui/components/Spinner";
import AlbumCard from "../../Albums/components/AlbumCard";

export default function AlbumsHomePage() {
  const {
    albums,
    isPending,
    isError,
    isSuccess,
    error,
    fetchNextPage,
    hasNextPage,
  } = useGetAlbums();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  return (
    <div className="h-48 md:h-64 w-full bg-primary rounded-lg p-3 disable-scrollbars grid grid-cols-3 md:grid-cols-4 gap-y-2 overflow-scroll">
      {isPending && <Spinner />}
      {isError && <div>{error}</div>}
      {isSuccess &&
        albums.pages.map((page) =>
          page.data.map((album) => (
            <div className="flex justify-center items-center" key={album._id}>
              <AlbumCard album={album} />
            </div>
          ))
        )}
      <div className="flex justify-center items-center">
        <div ref={ref}>
          {hasNextPage ? <Spinner /> : "That's all the albums"}
        </div>
      </div>
    </div>
  );
}
