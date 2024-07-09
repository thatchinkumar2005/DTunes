import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import likeApi from "../../../services/Songs/likeApi";

export default function useLike() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: like, isPending: isLiking } = useMutation({
    mutationFn: likeApi(axiosPrivate),
  });

  return { like, isLiking };
}
