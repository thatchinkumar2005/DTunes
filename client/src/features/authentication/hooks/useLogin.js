import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/axios/useAxios";
import loginApi from "../../../services/authentication/loginApi";

export default function useLogin() {
  const axios = useAxios();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginApi(axios),
  });

  return { login, isLoggingIn };
}
