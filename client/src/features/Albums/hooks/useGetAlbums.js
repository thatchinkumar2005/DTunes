import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useInfiniteQuery } from "@tanstack/react-query";
import getAlbumsApi from "../../../services/albums/getAlbumsApi";

export default function useGetAlbums() {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: albums,
    isPending,
    isError,
    isSuccess,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["albums"],
    queryFn: getAlbumsApi(axiosPrivate),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
  });

  return {
    albums,
    isError,
    isPending,
    isSuccess,
    error,
    fetchNextPage,
    hasNextPage,
  };
}
