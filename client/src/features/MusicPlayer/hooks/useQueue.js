import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getAuthUserQueue from "../../../services/users/authUser/getAuthUserQueueApi";

export default function useQueue() {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: queue,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["queue"],
    queryFn: getAuthUserQueue(axiosPrivate),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { queue, isPending, isSuccess };
}
