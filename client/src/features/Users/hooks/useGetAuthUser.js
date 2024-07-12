import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import getAuthUserApi from "../../../services/users/authUser/getAuthUserApi";

export default function useGetAuthUser() {
  const axiosPrivate = useAxiosPrivate();
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUserApi(axiosPrivate),
  });
  return { data, isPending, isSuccess };
}
