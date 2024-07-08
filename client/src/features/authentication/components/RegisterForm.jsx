import React from "react";
import { settings } from "../../../../settings";
import { FcGoogle } from "react-icons/fc";
import { TbBrandAuth0 } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <form className="h-[600px] w-[400px] rounded-lg bg-primary flex flex-col justify-start items-center">
      <h1 className="mt-10 text-3xl">Register</h1>
      <h2 className="text-red-500 mt-5"></h2>
      <div className="flex flex-col mt-5">
        <div className="text-red-500"></div>
        <input
          className="w-[300px] h-10 bg-transparent border-2 border-secondary rounded-md outline-none focus:shadow-lg"
          type="text"
          placeholder="Name"
        />
      </div>
      <div className="flex flex-col mt-5">
        <div className="text-red-500"></div>
        <input
          className="w-[300px] h-10 bg-transparent border-2 border-secondary rounded-md outline-none focus:shadow-lg"
          type="text"
          placeholder="username"
        />
      </div>
      <div className="flex flex-col mt-5">
        <div className="text-red-500"></div>
        <input
          className="w-[300px] h-10 bg-transparent border-2 border-secondary rounded-md outline-none focus:shadow-lg"
          type="text"
          placeholder="email"
        />
      </div>
      <div className="flex flex-col mt-5">
        <div className="text-red-500"></div>
        <input
          className="w-[300px] h-10 bg-transparent border-2 border-secondary rounded-md outline-none focus:shadow-lg"
          type="password"
          placeholder="password"
        />
      </div>
      <div className="flex flex-col mt-5">
        <div className="text-red-500"></div>
        <input
          className="w-[300px] h-10 bg-transparent border-2 border-secondary rounded-md outline-none focus:shadow-lg"
          type="password"
          placeholder="confirm password"
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
