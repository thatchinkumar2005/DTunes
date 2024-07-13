import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import partyRequestApi from "../../../services/Social/requestMemberApi";

export default function usePartyRequest() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: request, isPending: isRequesting } = useMutation({
    mutationFn: partyRequestApi(axiosPrivate),
  });
  return { request, isRequesting };
}
