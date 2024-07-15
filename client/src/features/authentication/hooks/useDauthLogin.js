import { useMutation } from "@tanstack/react-query";
import dauthApi from "../../../services/authentication/dauthApi";
import useAxios from "../../../hooks/axios/useAxios";

export default function useDauthLogin() {
  const axios = useAxios();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: dauthApi(axios),
  });
  return { login, isLoggingIn };
}
