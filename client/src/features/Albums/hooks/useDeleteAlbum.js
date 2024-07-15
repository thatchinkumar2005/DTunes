import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import deleteAlbumApi from "../../../services/albums/deleteAlbumApi";

export default function useDeleteAlbum() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteAlbumApi(axiosPrivate),
  });
  return { mutate, isPending };
}
