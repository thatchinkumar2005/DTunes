import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="flex bg-gray-800 flex-row items-center gap-3 col-start-1 col-end-3 border-b-2 border-primary">
      <h1 className="text-2xl ml-9">Dtunes</h1>
      <Link className="ml-20 hover:scale-150 duration-100 ">Home</Link>
      <Link className="ml-20 hover:scale-150 duration-100 ">Search</Link>
      <Link className="ml-20 hover:scale-150 duration-100 ">Social</Link>
      <Link className="ml-20 hover:scale-150 duration-100 ">Library</Link>
    </div>
  );
}
