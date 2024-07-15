import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDauthLogin from "../../features/authentication/hooks/useDauthLogin";
import useAuth from "../../hooks/auth/useAuth";
import Spinner from "../../ui/components/Spinner";

export default function DauthOauthCallBackPage() {
  const [params, setParams] = useSearchParams();
  const [code, setCode] = useState(null);

  useEffect(() => {
    setCode(params.toString());
  }, [params]);

  const { login, isLoggingIn } = useDauthLogin();

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  useEffect(() => {
    if (code)
      login(code, {
        onSuccess: (respData) => {
          setAuth(respData);
          navigate("/");
        },
        onError: (err) => {
          console.log(err.message);
        },
      });
  }, [code, login, setAuth]);

  return (
    <div className="flex justify-center items-center">
      <Spinner />
    </div>
  );
}
