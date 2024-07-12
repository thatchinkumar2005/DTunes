import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import deleteFriendApi from "../../../services/Social/deleteFriendApi";

export default function useDeleteFriend() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: deleteFriend, isPending: isDeletingFriend } = useMutation({
    mutationFn: deleteFriendApi(axiosPrivate),
  });
  return { deleteFriend, isDeletingFriend };
}
