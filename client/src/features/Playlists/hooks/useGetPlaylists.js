import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useInfiniteQuery } from "@tanstack/react-query";
import getPlaylistsApi from "../../../services/playlists/getPlaylistsApi";

export default function useGetPlaylists() {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: playlists,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylistsApi(axiosPrivate),
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: 1,
  });
  return {
    playlists,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  };
}
