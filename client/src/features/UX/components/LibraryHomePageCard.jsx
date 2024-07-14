import React from "react";
import { LuLibrary } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div className="bg-secondary p-5  flex flex-row gap-5 justify-center items-center rounded-lg  hover:bg-gray-600">
      <LuLibrary className="h-7 w-7 " />
      <Link to={"/library"} className="text-xl">
        Library
      </Link>
    </div>
  );
}
