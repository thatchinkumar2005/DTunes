import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import playSongApi from "../../../services/Songs/playSongApi";

export default function usePlaySong() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: play, isPending: isPlaying } = useMutation({
    mutationFn: playSongApi(axiosPrivate),
  });
  return { play, isPlaying };
}
