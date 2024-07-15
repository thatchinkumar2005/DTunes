import React from "react";
import { settings } from "../../../../settings";
import { FcGoogle } from "react-icons/fc";
import { TbBrandAuth0 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useRegister from "../hooks/useRegister";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register: registerApi, isRegistering } = useRegister();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setError,
  } = useForm();

  function onSubmit(formData) {
    const data = { ...formData, roles: { user: 2005 } };
    registerApi(data, {
      onSuccess: (respData) => {
        navigate("/auth/login");
      },
      onError: (error) => {
        setError("root", {
          message: error.message,
        });
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-auto w-auto py-5 px-10 md:px-16 rounded-lg bg-primary flex flex-col justify-start items-center"
    >
      <h1 className="mt-10 text-3xl">Register</h1>
      <h2 className="text-red-500 mt-5">
        {errors.root && errors.root?.message}
      </h2>
      <div className="flex flex-col mt-5">
        <div className="text-red-500 w-[300px]">
          {" "}
          {errors.fname && errors.fname?.message}
        </div>
        <input
          className="w-[300px] h-10 bg-transparent border-2 border-secondary rounded-md outline-none focus:shadow-lg"
          type="text"
          placeholder="Name"
          {...register("fname", {
            required: {
              value: true,
              message: "Name is required",
            },
            maxLength: {
              value: 17,
              message: "Name can only contain 18 characters..",
            },
          })}
        />
      </div>
      <div className="flex flex-col mt-5">
        <div className="text-red-500 w-[300px]">
          {" "}
          {errors.username && errors.username?.message}
        </div>
        <input
          className="w-[300px] h-10 bg-transparent border-2 border-secondary rounded-md outline-none focus:shadow-lg"
          type="text"
          placeholder="username"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
            pattern: {
              value: /^[a-z0-9_-]{3,16}$/,
              message: "Username should contain alphabets and digits",
            },
          })}
        />
      </div>
      <div className="flex flex-col mt-5">
        <div className="text-red-500 w-[300px]">
          {" "}
          {errors.email && errors.email?.message}
        </div>
        <input
          className="w-[300px] h-10 bg-transparent border-2 border-secondary rounded-md outline-none focus:shadow-lg"
          type="text"
          placeholder="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
              message: "Enter a valid email",
            },
          })}
        />
      </div>
      <div className="flex flex-col mt-5">
        <div className="text-red-500 w-[300px]">
          {errors.pswd && errors.pswd?.message}
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
            pattern: {
              value:
                /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/,
              message:
                "1 lowercase , 1 uppercase , 1 number, and at least 8 characters long",
            },
          })}
        />
      </div>
      <div className="flex flex-col mt-5">
        <div className="text-red-500 w-[300px]">
          {errors.confPswd && errors.confPswd?.message}
        </div>
        <input
          className="w-[300px] h-10 bg-transparent border-2 border-secondary rounded-md outline-none focus:shadow-lg"
          type="password"
          placeholder="confirm password"
          {...register("confPswd", {
            required: {
              value: true,
              message: "Enter the password again.",
            },
            validate: (val) => {
              if (val !== watch("pswd")) return "Passwords Do not match";
            },
          })}
        />
      </div>
      <button className="h-10 w-32 rounded bg-transparent border-2 mt-3 outline-none text-black hover:scale-105 duration-150 backdrop-blur-0 hover:bg-secondary hover:text-text">
        Register
      </button>

      <div className="h-0.5 bg-white w-full mt-3"></div>

      <div className="mt-2">
        Already have an account? <Link to={"/auth/login"}>Login</Link>
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
