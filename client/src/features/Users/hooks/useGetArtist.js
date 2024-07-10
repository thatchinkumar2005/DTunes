import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getArtistApi from "../../../services/users/getArtistApi";

export default function useGetArtist({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: artist,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["artist", id],
    queryFn: getArtistApi(axiosPrivate),
    enabled: !!id,
  });
  return { artist, isFetching, isSuccess };
}
