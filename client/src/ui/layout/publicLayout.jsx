import React from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="h-screen w-screen flex flex-row justify-center items-center">
      <div className="w-20 flex justify-center items-center rounded h-20 mr-[200px]">
        <h1 className="text-center text-5xl">DTUNES</h1>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
