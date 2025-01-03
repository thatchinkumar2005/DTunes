import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getPlaylistApi from "../../../services/playlists/getPlaylistApi";

export default function useGetPlaylist({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["playlist", id],
    queryFn: getPlaylistApi(axiosPrivate),
    enabled: !!id,
  });
  return { data, isPending, isSuccess };
}
