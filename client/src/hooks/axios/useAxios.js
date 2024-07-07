import axios_ from "axios";
import { settings } from "../../../settings";

const axios = axios_.create({
  baseURL: settings.serverOrigin,
  withCredentials: true,
});

export default function useAxios() {
  return axios;
}
