import { useContext } from "react";
import { AuthContext } from "../../contexts/authContex";

export default function useAuth() {
  return useContext(AuthContext);
}
