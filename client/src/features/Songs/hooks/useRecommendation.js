import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getRecommendationsApi from "../../../services/Songs/getRecommendationsApi";

export default function useRecommendation() {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: recommendedSongs,
    fetchNextPage,
    status,
    error,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["recommendedSongs"],
    queryFn: getRecommendationsApi(axiosPrivate),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    gcTime: 0,
  });

  return { recommendedSongs, fetchNextPage, status, error, hasNextPage };
}
