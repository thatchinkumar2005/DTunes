import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getPlaylistSongs from "../../../services/playlists/getPlaylistSongs";

export default function useGetPlaylistSongs({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: playlistSongs,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["playlistSongs", id],
    queryFn: getPlaylistSongs(axiosPrivate),
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: 1,
  });

  return {
    playlistSongs,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  };
}
