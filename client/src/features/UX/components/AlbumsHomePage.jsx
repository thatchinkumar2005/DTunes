import React, { useEffect } from "react";
import AlbumCard from "../../Albums/components/AlbumCard";
import useGetAlbums from "../../Albums/hooks/useGetAlbums";
import { useInView } from "react-intersection-observer";
import Spinner from "../../../ui/components/Spinner";

export default function AlbumsHomePage() {
  const {
    albums,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    error,
  } = useGetAlbums();
  const { inView, ref } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  });
  return (
    <div className="h-48 md:h-64 w-full bg-primary rounded-lg p-3 disable-scrollbars grid grid-cols-3 md:grid-cols-4 gap-y-2 overflow-scroll">
      {isError && <div>{error}</div>}
      {isPending && <Spinner />}
      {isSuccess &&
        albums.pages.map((page) =>
          page.data.map((album) => (
            <div className="flex justify-center items-center">
              <AlbumCard key={album._id} album={album} />
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
