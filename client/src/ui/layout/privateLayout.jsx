import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import MusicPlayer from "../../features/MusicPlayer/components/MusicPlayer";

export default function PrivateLayout() {
  return (
    <div className="w-screen grid grid-cols-[1fr] grid-rows-[8.33vh_75vh_8.33vh_8.33vh] md:grid-cols-[1fr_4fr] md:grid-rows-[9.1vh_81.8vh_9.1vh]">
      <NavBar />
      <SideBar />
      <main className="row-start-2 row-end-3">
        <Outlet />
      </main>
      <MusicPlayer />
    </div>
  );
}
