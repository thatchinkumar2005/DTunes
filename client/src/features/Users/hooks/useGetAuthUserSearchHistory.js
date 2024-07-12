import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getAuthUserSearchHistoryApi from "../../../services/users/authUser/getAuthUserSearchHistoryApi";

export default function useGetAuthUserSearchHistory() {
  const axiosPrivate = useAxiosPrivate();
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["authUserSearchHistory"],
    queryFn: getAuthUserSearchHistoryApi(axiosPrivate),
  });
  return { data, isFetching, isSuccess };
}
