import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getAlbumApi from "../../../services/albums/getAlbumApi";

export default function useGetAlbum({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["album", id],
    queryFn: getAlbumApi(axiosPrivate),
    enabled: !!id,
  });

  return { data, isPending, isSuccess };
}
