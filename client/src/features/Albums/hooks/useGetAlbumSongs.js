import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getAlbumSongsApi from "../../../services/albums/getAlbumSongsApi";

export default function useGetAlbumSongs({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: albumSongs,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["albumSongs", id],
    queryFn: getAlbumSongsApi(axiosPrivate),
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: 1,
    enabled: !!id,
  });

  return {
    albumSongs,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  };
}
