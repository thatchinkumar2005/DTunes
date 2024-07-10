import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../../ui/components/Spinner";
import { CiPlay1 } from "react-icons/ci";

import useGetArtist from "../../features/Users/hooks/useGetArtist";
import useGetAlbum from "../../features/Albums/hooks/useGetAlbum";
import useGetAlbumSongs from "../../features/Albums/hooks/useGetAlbumSongs";
import { useInView } from "react-intersection-observer";
import SongCard from "../../features/Songs/components/SongCard";

export default function AlbumPage() {
  const { id } = useParams();

  const {
    data: album,
    isFetching: isGettingAlbum,
    isSuccess: isFetchedAlbum,
  } = useGetAlbum({ id });

  const {
    artist,
    isFetching: isGettingArtist,
    isSuccess: isFetchedArtist,
  } = useGetArtist({
    id: album?.artist,
  });

  const {
    albumSongs,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useGetAlbumSongs({ id });

  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="flex flex-col overflow-scroll disable-scrollbars h-full w-full">
      {(isGettingArtist || isGettingAlbum) && <Spinner />}
      {isFetchedArtist && isFetchedAlbum && (
        <>
          <div className="flex justify-start w-full items-center p-2 h-52 border-b-2 border-primary">
            <div className="shrink-0 flex flex-col self-center">
              <img
                className="h-36 rounded-lg mb-3"
                src={album.files.coverArt}
              />
            </div>
            <div className=" h-full p-4 flex flex-col gap-2 justify-start grow shrink-0">
              <h1 className="text-3xl ">{album.name}</h1>
              <span className="text-sm self-start text-gray-500">
                {artist.fname}
              </span>
              <div className="mt-7 flex justify-start gap-10 items-center">
                Album
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center grow p-3 ">
            <div className="w-[80%] rounded-lg grow overflow-scroll disable-scrollbars bg-secondary p-3">
              {isError && <div>{error}</div>}
              {isPending && <Spinner />}
              {isSuccess &&
                albumSongs.pages.map((page) =>
                  page.data.map((song) => (
                    <SongCard key={song._id} song={song} />
                  ))
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
