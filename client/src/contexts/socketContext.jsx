import { createContext } from "react";
import { socket } from "../socket/socket";

export const SocketContext = createContext();
export default function SocketContextProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
