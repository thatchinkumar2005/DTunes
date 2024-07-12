import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import friendRespondApi from "../../../services/Social/friendRespondApi";

export default function useFriendRespond() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: respond, isPending: isResponding } = useMutation({
    mutationFn: friendRespondApi(axiosPrivate),
  });

  return { respond, isResponding };
}
