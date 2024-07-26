import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import nextSongApi from "../../../services/Songs/nextSongApi";

export default function useNextSong() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: nextSong, isPending } = useMutation({
    mutationFn: nextSongApi(axiosPrivate),
  });

  return { nextSong, isPending };
}
