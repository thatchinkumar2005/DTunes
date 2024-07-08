import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/axios/useAxios";
import googleLoginApi from "../../../services/authentication/googleLoginApi";

export default function useGoogleLogin() {
  const axios = useAxios();
  const {
    mutate: login,
    isPending: isLoggingIn,
    isIdle,
  } = useMutation({
    mutationFn: googleLoginApi(axios),
    retry: false,
  });

  return { login, isLoggingIn, isIdle };
}
