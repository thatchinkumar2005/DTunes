import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getArtistAlbums from "../../../services/users/getArtistAlbums";

export default function useGetArtistAlbums({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: userAlbums,
    error,
    isError,
    isPending,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["userAlbums", id],
    queryFn: getArtistAlbums(axiosPrivate),
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: 1,
  });

  return {
    userAlbums,
    error,
    isError,
    isPending,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  };
}
