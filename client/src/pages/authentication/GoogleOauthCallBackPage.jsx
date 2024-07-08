import React, { useEffect, useRef, useState } from "react";
import Spinner from "../../ui/components/Spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGoogleLogin from "../../features/authentication/hooks/useGoogleLogin";
import useAuth from "../../hooks/auth/useAuth";

export default function GoogleOauthCallBackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const { login, isLoggingIn } = useGoogleLogin();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setCode(searchParams.toString());
  }, [searchParams]);

  useEffect(() => {
    if (code)
      login(code, {
        onSuccess: (respData) => {
          setAuth(respData);
          navigate("/");
        },
        onError: (error) => {
          setError("Oauth Failed");
        },
      });
  }, [code, login, setAuth, navigate]);
  return <div>{isLoggingIn ? <Spinner /> : error}</div>;
}
