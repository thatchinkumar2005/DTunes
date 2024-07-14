import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getSongApi from "../../../services/Songs/getSongApi";

export default function useSong({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: song,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["song", id],
    queryFn: getSongApi(axiosPrivate),
    enabled: !!id,
  });
  return { song, isPending, isSuccess };
}
