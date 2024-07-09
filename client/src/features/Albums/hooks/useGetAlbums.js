import { useInfiniteQuery } from "@tanstack/react-query";
import getAlbumsApi from "../../../services/albums/getAlbumsApi";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";

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
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: 1,
    gcTime: 0,
  });
  return {
    albums,
    isPending,
    isError,
    isSuccess,
    error,
    fetchNextPage,
    hasNextPage,
  };
}
