import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import prevSongApi from "../../../services/Songs/prevSongApi";

export default function usePrevSong() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: prevSong, isPending } = useMutation({
    mutationFn: prevSongApi(axiosPrivate),
  });

  return { prevSong, isPending };
}
