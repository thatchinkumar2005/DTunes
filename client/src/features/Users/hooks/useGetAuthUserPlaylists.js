import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getAuthUserPlaylistsApi from "../../../services/users/authUser/getAuthUserPlaylists";

export default function useGetAuthUserPlaylists() {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: authUserPlaylists,
    isFetching: isGetting,
    isSuccess,
  } = useQuery({
    queryKey: ["authUserPlaylists"],
    queryFn: getAuthUserPlaylistsApi(axiosPrivate),
  });

  return { authUserPlaylists, isGetting, isSuccess };
}
