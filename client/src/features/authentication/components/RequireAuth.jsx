import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/auth/useAuth";

export default function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();

  if (auth) {
    const permitted = auth.roles
      .map((role) => allowedRoles.includes(role))
      .find((v) => v === true);

    if (permitted) {
      return <Outlet />;
    } else {
      return <Navigate to={"/unauthorized"} />;
    }
  } else {
    return <Navigate to="/auth/login" />;
  }
}
