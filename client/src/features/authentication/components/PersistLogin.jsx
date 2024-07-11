import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/auth/useAuth";
import useRefresh from "../../../hooks/auth/useRefresh";
import Spinner from "../../../ui/components/Spinner";
import { Outlet } from "react-router-dom";

export default function PersistLogin() {
  const { persist, auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const refresh = useRefresh();
  let isMounted;
  useEffect(() => {
    isMounted = true;
    async function verifyAuth() {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setLoading(false);
      }
    }

    !auth?.accessToken && persist ? verifyAuth() : setLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  if (persist) {
    if (loading) return <Spinner />;
    return <Outlet />;
  } else {
    return <Outlet />;
  }
}
