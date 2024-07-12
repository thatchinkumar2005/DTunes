import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getAuthUserFriends from "../../../services/users/authUser/getAuthUserFriends";

export default function useGetAuthUserFriends() {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: authUserFriends,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["authUserFriends"],
    queryFn: getAuthUserFriends(axiosPrivate),
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: 1,
  });

  return {
    authUserFriends,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  };
}
