import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import deletePlaylistApi from "../../../services/playlists/deletePlaylist";

export default function useDeletePlaylist() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate, isPending } = useMutation({
    mutationFn: deletePlaylistApi(axiosPrivate),
  });
  return { mutate, isPending };
}
