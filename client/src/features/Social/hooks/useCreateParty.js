import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import createPartyApi from "../../../services/Social/createPartyApi";

export default function useCreateParty() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate, isPending } = useMutation({
    mutationFn: createPartyApi(axiosPrivate),
  });

  return { mutate, isPending };
}
