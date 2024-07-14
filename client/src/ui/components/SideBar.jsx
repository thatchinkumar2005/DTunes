import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="row-start-4 bg-layout row-end-5 flex flex-row justify-center items-center md:col-start-1, md:col-end-2 md:row-start-2 md:row-end-4 md:flex-col ">
      <NavLink
        to={"/"}
        className="mx-8 text-sm md:hidden hover:scale-125  duration-100 active:text-blue-500 "
      >
        Home
      </NavLink>
      <NavLink
        to={"/search"}
        className="mx-8 text-sm md:hidden hover:scale-125  duration-100 active:text-blue-500 "
      >
        Search
      </NavLink>
      <NavLink
        to={"/social"}
        className="mx-8 text-sm md:hidden hover:scale-125  duration-100 active:text-blue-500 "
      >
        Social
      </NavLink>
      <NavLink
        to={"/library"}
        className="mx-8 text-sm md:hidden hover:scale-125 duration-100 active:text-blue-500 "
      >
        Library
      </NavLink>

      <div className="hidden md:block p-3 h-full w-full">
        <div className="flex flex-col bg-primary w-full h-full p-1 rounded-lg">
          <h1 className="text-3xl self-center">Friends</h1>
        </div>
      </div>
    </div>
  );
}
