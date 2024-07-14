import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getUserApi from "../../../services/users/getUserApi";

export default function useGetUser({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: user,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["artist", id],
    queryFn: getUserApi(axiosPrivate),
    enabled: !!id,
  });
  return { user, isPending, isSuccess };
}
