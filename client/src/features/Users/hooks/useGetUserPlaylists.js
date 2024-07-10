import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getUserPlaylists from "../../../services/users/getUserPlaylists";

export default function useGetUserPlaylists({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: userPlaylists,
    error,
    isError,
    isPending,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["userPlaylists", id],
    queryFn: getUserPlaylists(axiosPrivate),
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: 1,
  });

  return {
    userPlaylists,
    error,
    isError,
    isPending,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  };
}
