import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import playAlbumApi from "../../../services/albums/playAlbumApi";

export default function usePlayAlbum() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: play, isPending: isPlaying } = useMutation({
    mutationFn: playAlbumApi(axiosPrivate),
  });
  return { play, isPlaying };
}
