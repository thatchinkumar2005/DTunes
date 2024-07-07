import useAxios from "../axios/useAxios";
import useAuth from "./useAuth";

export default function useRefresh() {
  return async () => {
    try {
      const axios = useAxios();
      const resp = await axios({
        method: "GET",
        url: "auth/refresh",
      });
      const { setAuth } = useAuth();
      setAuth(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };
}
