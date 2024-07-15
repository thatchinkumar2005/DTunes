import React from "react";
import { LuLibrary } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/library");
      }}
      className="bg-secondary p-5  flex flex-row gap-5 justify-center items-center rounded-lg  hover:bg-gray-600 cursor-pointer"
    >
      <LuLibrary className="h-7 w-7 " />
      <span to={"/library"} className="text-xl">
        Library
      </span>
    </div>
  );
}
