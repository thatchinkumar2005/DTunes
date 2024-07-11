import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getRecommendationsApi from "../../../services/Songs/getRecommendationsApi";
import useAuth from "../../../hooks/auth/useAuth";

export default function useRecommendation() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
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
    enabled: !!auth,
  });

  return { recommendedSongs, fetchNextPage, status, error, hasNextPage };
}
