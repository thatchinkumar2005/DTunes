import React, { useEffect } from "react";
import useLogout from "../../features/authentication/hooks/useLogout";
import Spinner from "../../ui/components/Spinner";
import useAuth from "../../hooks/auth/useAuth";

export default function Logout() {
  const { logout, isLoggingOut } = useLogout();
  const { setAuth } = useAuth();
  useEffect(() => {
    logout(null, {
      onSuccess: () => {
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
