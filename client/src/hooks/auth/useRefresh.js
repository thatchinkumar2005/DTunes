import useAxios from "../axios/useAxios";
import useAuth from "./useAuth";

export default function useRefresh() {
  const { setAuth } = useAuth();
  return async () => {
    try {
      const axios = useAxios();
      const resp = await axios({
        method: "GET",
        url: "auth/refresh",
      });

      setAuth(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };
}
