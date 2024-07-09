import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getArtistsApi from "../../../services/users/getArtistsApi";

export default function useGetArtists() {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: artists,
    isError,
    isPending,
    isSuccess,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["artists"],
    queryFn: getArtistsApi(axiosPrivate),
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: 1,
  });

  return {
    artists,
    isError,
    isPending,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    error,
  };
}
