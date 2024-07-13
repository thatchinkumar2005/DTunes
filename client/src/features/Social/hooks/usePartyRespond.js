import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import partyRespondApi from "../../../services/Social/respondPartyReq";

export default function usePartyRespond() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: respond, isPending: isResponding } = useMutation({
    mutationFn: partyRespondApi(axiosPrivate),
  });
  return { respond, isResponding };
}
