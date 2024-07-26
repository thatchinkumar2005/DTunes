import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import playPlaylistApi from "../../../services/playlists/playPlaylistApi";

export default function usePlayPlaylist() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: play, isPending: isPlaying } = useMutation({
    mutationFn: playPlaylistApi(axiosPrivate),
  });
  return { play, isPlaying };
}
