import React from "react";
import { FcGoogle } from "react-icons/fc";
import { TbBrandAuth0 } from "react-icons/tb";

export default function LoginForm() {
  return (
    <form className="h-[500px] w-[400px] bg-primary rounded-lg flex flex-col justify-start items-center">
      <h1 className="text-3xl mt-2">Login</h1>
      <div className="flex flex-col gap-2 mt-3">
        <div className="text-red-500"></div>
        <input
          className="w-[300px] h-10 bg-transparent border-2 border-secondary rounded-md outline-none focus:shadow-lg"
          type="text"
          placeholder="username or email"
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <div className="text-red-500"></div>
        <input
          className="w-[300px] h-10 bg-transparent border-2 border-secondary rounded-md outline-none focus:shadow-lg"
          type="text"
          placeholder="password"
        />
      </div>

      <button className="h-10 w-32 rounded bg-transparent border-2 mt-10 outline-none text-black hover:scale-105 duration-150 backdrop-blur-0 hover:bg-secondary hover:text-text">
        Login
      </button>

      <div className="mt-[30px] h-0.5 w-full bg-white" />

      <div className="mt-2">I don't have an account. Sign up</div>

      <div>Or</div>

      <div className="w-full h-24 flex flex-col justify-center items-center gap-3">
        <div className="w-52 flex gap-1">
          <FcGoogle size={30} />
          continue with google
        </div>
        <div className="w-52 flex gap-1">
          <TbBrandAuth0 size={30} />
          continue with Dauth
        </div>
      </div>
    </form>
  );
}
