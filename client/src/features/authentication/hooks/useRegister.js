import useAxios from "../../../hooks/axios/useAxios";
import { useMutation } from "@tanstack/react-query";
import registerApi from "../../../services/authentication/registerApi";

export default function useRegister() {
  const axios = useAxios();

  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: registerApi(axios),
  });

  return { register, isRegistering };
}
