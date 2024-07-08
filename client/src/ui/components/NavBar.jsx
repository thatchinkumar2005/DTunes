import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="flex bg-gray-800 flex-row items-center md:gap-3 md:col-start-1 md:col-end-3 border-b-2 border-primary">
      <h1 className="text-2xl md:text-2xl mx-3">Dtunes</h1>
      <Link className="hidden md:block md:mx-10 hover:scale-125  md:hover:scale-150 duration-100 ">
        Home
      </Link>
      <Link className="hidden md:block md:mx-10 hover:scale-125  md:hover:scale-150 duration-100 ">
        Search
      </Link>
      <Link className="hidden md:block md:mx-10 hover:scale-125  md:hover:scale-150 duration-100 ">
        Social
      </Link>
      <Link className="hidden md:block md:mx-10 hover:scale-125 md:hover:scale-150 duration-100 ">
        Library
      </Link>
      <div className="w-12 h-12 rounded-full bg-black mr-5 ml-auto"></div>
    </div>
  );
}
