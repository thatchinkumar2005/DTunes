import { useContext } from "react";
import { SocketContext } from "../../contexts/socketContext";

export default function useSocket() {
  return useContext(SocketContext);
}
