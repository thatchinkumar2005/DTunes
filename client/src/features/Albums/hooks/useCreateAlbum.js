import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import createAlbumApi from "../../../services/albums/createAlbumApi";
export default function useCreateAlbum() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: createAlbum, isPending: isCreatingAlbum } = useMutation({
    mutationFn: createAlbumApi(axiosPrivate),
  });

  return { createAlbum, isCreatingAlbum };
}
