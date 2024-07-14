import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import getAuthUserLikePlaylist from "../../../services/users/authUser/getAuthUserLikePlaylist";

export default function useGetAuthUserLikePlaylist() {
  const axiosPrivate = useAxiosPrivate();
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["authUserLikePlaylist"],
    queryFn: getAuthUserLikePlaylist(axiosPrivate),
  });
  return { data, isPending, isSuccess };
}
