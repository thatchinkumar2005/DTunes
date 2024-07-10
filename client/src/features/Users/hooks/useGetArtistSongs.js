import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getArtistSongs from "../../../services/users/getArtistSongs";

export default function useGetArtistSongs({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: artistSongs,
    error,
    isError,
    isPending,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["userSongs", id],
    queryFn: getArtistSongs(axiosPrivate),
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: 1,
  });

  return {
    artistSongs,
    error,
    isError,
    isPending,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  };
}
