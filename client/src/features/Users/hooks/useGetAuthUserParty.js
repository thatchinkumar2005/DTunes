import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import getAuthUserPartyApi from "../../../services/Social/getAuthUserParty";
export default function useGetAuthUserParty() {
  const axiosPrivate = useAxiosPrivate();
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["authUserParty"],
    queryFn: getAuthUserPartyApi(axiosPrivate),
  });

  return { data, isFetching, isSuccess };
}