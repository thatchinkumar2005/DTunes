import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import deleteSongApi from "../../../services/Songs/deleteSongApi";

export default function useDeleteSong() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteSongApi(axiosPrivate),
  });
  return { mutate, isPending };
}
