import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="row-start-4 bg-layout row-end-5 flex flex-row justify-center items-center md:col-start-1, md:col-end-2 md:row-start-2 md:row-end-4 md:flex-col ">
      <Link
        to={"/"}
        className="mx-8 text-sm md:hidden hover:scale-125  duration-100 "
      >
        Home
      </Link>
      <Link
        to={"/search"}
        className="mx-8 text-sm md:hidden hover:scale-125  duration-100 "
      >
        Search
      </Link>
      <Link className="mx-8 text-sm md:hidden hover:scale-125  duration-100 ">
        Social
      </Link>
      <Link className="mx-8 text-sm md:hidden hover:scale-125 duration-100 ">
        Library
      </Link>

      <div className="hidden md:block">SIDEBAR</div>
    </div>
  );
}
