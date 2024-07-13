import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getAuthUserPartyRequests from "../../../services/users/authUser/getAuthUserPartyRequests";

export default function useGetAuthUserPartyRequests() {
  const axiosPrivate = useAxiosPrivate();
  const {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["authUserPartyRequests"],
    queryFn: getAuthUserPartyRequests(axiosPrivate),
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: 1,
  });

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  };
}
