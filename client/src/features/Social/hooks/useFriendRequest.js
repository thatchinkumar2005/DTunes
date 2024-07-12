import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import frndRequestApi from "../../../services/Social/frndRequestApi";

export default function useFriendRequest() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: request, isPending: isRequesting } = useMutation({
    mutationFn: frndRequestApi(axiosPrivate),
  });
  return { request, isRequesting };
}
