import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import MusicPlayer from "../../features/MusicPlayer/MusicPlayer";

export default function PrivateLayout() {
  return (
    <div className="h-screen w-screen grid grid-cols-[1fr] grid-rows-[1fr_9fr_0.8fr_1fr] md:grid-cols-[1fr_4fr] md:grid-rows-[1fr_9fr_1fr]">
      <NavBar />
      <SideBar />
      <main className="md: row-start-2 row-end-3">
        <Outlet />
      </main>
      <MusicPlayer />
    </div>
  );
}
