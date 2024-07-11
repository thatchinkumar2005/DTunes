import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import createPlaylistApi from "../../../services/playlists/createPlaylistApi";

export default function useCreatePlaylist() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: createPlaylist, isPending: isCreating } = useMutation({
    mutationFn: createPlaylistApi(axiosPrivate),
  });

  return { createPlaylist, isCreating };
}
