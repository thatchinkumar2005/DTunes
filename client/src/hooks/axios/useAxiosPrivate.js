import axios from "axios";
import { settings } from "../../../settings";
import useAuth from "../auth/useAuth";
import useRefresh from "../auth/useRefresh";
import { useEffect } from "react";

const axiosPrivate = axios.create({
  baseURL: settings.serverOrigin,
  withCredentials: true,
});

export default function useAxiosPrivate() {
  const { auth, setAuth } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,

      async (error) => {
        const prevReq = error.config;
        if (error?.response?.status == 403 && !prevReq.sent) {
          prevReq.sent = true;
          const respAuth = await refresh();
          prevReq.headers.Authorization = `Bearer ${respAuth.accessToken}`;
          return axiosPrivate(prevReq);
        } else {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
}
