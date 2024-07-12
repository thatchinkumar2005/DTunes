import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getAuthUserPlaylistsApi from "../../../services/users/authUser/getAuthUserPlaylists";

export default function useGetAuthUserPlaylists() {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: authUserPlaylists,
    error,
    isPending,
    isError,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["authUserPlaylists"],
    queryFn: getAuthUserPlaylistsApi(axiosPrivate),
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: 1,
  });

  return {
    authUserPlaylists,
    error,
    isPending,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  };
}
