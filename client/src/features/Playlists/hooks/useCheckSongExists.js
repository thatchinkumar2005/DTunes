import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import checkIfSongExistsApi from "../../../services/playlists/checkIfSongExistsApi";

export default function useCheckSongExists({ songId, playlistId }) {
  const axiosPrivate = useAxiosPrivate();
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["songPlaylistReln", songId, playlistId],
    queryFn: checkIfSongExistsApi(axiosPrivate),
  });
  return { data, isFetching, isSuccess };
}
