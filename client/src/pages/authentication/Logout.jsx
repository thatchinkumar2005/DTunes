import React, { useEffect } from "react";
import useLogout from "../../features/authentication/hooks/useLogout";
import Spinner from "../../ui/components/Spinner";
import useAuth from "../../hooks/auth/useAuth";
import useSocket from "../../hooks/socket/useSocket";

export default function Logout() {
  const { logout, isLoggingOut } = useLogout();
  const { setAuth, auth } = useAuth();
  const socket = useSocket();
  useEffect(() => {
    logout(null, {
      onSuccess: () => {
        socket.emit("logout", { userId: auth.id });
        // socket.disconnect();
        setAuth(null);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }, []);
  if (isLoggingOut) return <Spinner />;
  return <div>Logged out</div>;
}
