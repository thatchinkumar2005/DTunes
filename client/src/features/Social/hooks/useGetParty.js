import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getParty from "../../../services/Social/getParty";

export default function useGetParty({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: party,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["party", id],
    queryFn: getParty(axiosPrivate),
    enabled: !!id,
  });

  return { party, isPending };
}
