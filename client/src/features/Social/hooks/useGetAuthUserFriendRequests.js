import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getAuthUserFriendRequests from "../../../services/users/authUser/getAuthUserFriendRequests";

export default function useGetAuthUserFriendRequests() {
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
    queryKey: ["authUserFriendRequests"],
    queryFn: getAuthUserFriendRequests(axiosPrivate),
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
