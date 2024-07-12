import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/axios/useAxios";
import logoutApi from "../../../services/authentication/logoutApi";

export default function useLogout() {
  const axios = useAxios();
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi(axios),
  });
  return { logout, isLoggingOut };
}
