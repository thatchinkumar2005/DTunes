import React from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center md:flex-row">
      <div className="w-20 flex justify-center items-center rounded h-20 md:mr-[200px] md:gap-16">
        <h1 className="text-center text-5xl">DTUNES</h1>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
