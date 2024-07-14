import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { TbBrandAuth0 } from "react-icons/tb";
import useLogin from "../hooks/useLogin";
import useAuth from "../../../hooks/auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { settings } from "../../../../settings";

export default function LoginForm() {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setError,
  } = useForm();

  const { login, isLoggingIn } = useLogin();

  const { setAuth, persist, setPersist } = useAuth();

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const navigate = useNavigate();

  function onSubmit(formData) {
    login(formData, {
      onSuccess: (respData) => {
        setAuth(respData);
        navigate("/");
      },
      onError: (error) => {
        setError("root", {
          message: error.message,
        });
        console.log(error);
      },
    });
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-auto w-auto p-10 bg-primary rounded-lg flex flex-col justify-start items-center"
    >
      <h1 className="text-3xl mt-2">Login</h1>
      <h2 className="text-red-500 mt-5">
        {errors?.root && errors.root?.message}
      </h2>
      <div className="flex flex-col gap-2 mt-3">
        <div className="text-red-500">
          {errors?.username_email && errors.username_email?.message}
        </div>
        <input
          className="w-[300px] h-10 bg-transparent border-2 border-secondary rounded-md outline-none focus:shadow-lg"
          type="text"
          placeholder="username or email"
          {...register("username_email", {
            required: {
              value: true,
              message: "Username or email should be provided",
            },
          })}
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <div className="text-red-500">
          {errors?.pswd && errors.pswd?.message}
        </div>
        <input
          className="w-[300px] h-10 bg-transparent border-2 border-secondary rounded-md outline-none focus:shadow-lg"
          type="password"
          placeholder="password"
          {...register("pswd", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
      </div>

      <button
        disabled={isLoggingIn}
        className="h-10 w-32 rounded bg-transparent border-2 mt-10 outline-none text-black hover:scale-105 duration-150 backdrop-blur-0 hover:bg-secondary hover:text-text"
      >
        Login
      </button>

      <div className="mt-5">
        <input
          type="checkbox"
          id="persist"
          onChange={togglePersist}
          checked={persist}
        />
        <span className="ml-2">Trust this device</span>
      </div>

      <div className="mt-[30px] h-0.5 w-full bg-white" />

      <div className="mt-2">
        I don't have an account. <Link to={"/auth/register"}>register</Link>
      </div>

      <div>Or</div>

      <div className="w-full h-24 flex flex-col justify-center items-center gap-3">
        <div className="w-52 flex gap-1 cursor-pointer">
          <FcGoogle size={30} />
          <Link to={`${settings.serverOrigin}/auth/oauth/google`}>
            continue with google
          </Link>
        </div>
        <div className="w-52 flex gap-1">
          <TbBrandAuth0 size={30} />
          continue with Dauth
        </div>
      </div>
    </form>
  );
}
