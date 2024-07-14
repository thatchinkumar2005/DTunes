import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import deletePartyApi from "../../../services/Social/deletePartyApi";

export default function useDeleteParty() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: deleteParty, isPending } = useMutation({
    mutationFn: deletePartyApi(axiosPrivate),
  });
  return { deleteParty, isPending };
}
