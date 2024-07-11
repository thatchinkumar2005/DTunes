import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import toggleSongApi from "../../../services/Songs/toggleSongApi";

export default function useToggleSong() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: toggle, isPending: isToggling } = useMutation({
    mutationFn: toggleSongApi(axiosPrivate),
  });
  return { toggle, isToggling };
}
