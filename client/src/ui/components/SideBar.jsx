import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="row-start-4 row-end-5 flex flex-row justify-center items-center md:col-start-1, md:col-end-2 md:row-start-2 md:row-end-4 bg-gray-800">
      <Link className="mx-8 text-sm md:hidden hover:scale-125  duration-100 ">
        Home
      </Link>
      <Link className="mx-8 text-sm md:hidden hover:scale-125  duration-100 ">
        Search
      </Link>
      <Link className="mx-8 text-sm md:hidden hover:scale-125  duration-100 ">
        Social
      </Link>
      <Link className="mx-8 text-sm md:hidden hover:scale-125 duration-100 ">
        Library
      </Link>
    </div>
  );
}
