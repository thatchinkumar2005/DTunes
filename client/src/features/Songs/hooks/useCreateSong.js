import { useMutation } from "@tanstack/react-query";
import createSongApi from "../../../services/Songs/createSongApi";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";

export default function useCreateSong() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: createSong, isCreatingSong } = useMutation({
    mutationFn: createSongApi(axiosPrivate),
  });

  return { createSong, isCreatingSong };
}
