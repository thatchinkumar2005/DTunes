import React from "react";
import { FaHeart } from "react-icons/fa";

export default function LikedPlaylistHomePageCard() {
  return (
    <div className="bg-secondary p-5  flex flex-row gap-5 justify-center items-center rounded-lg  hover:bg-gray-600">
      <FaHeart className="h-7 w-7 fill-blue-500" />
      <span className="text-xl">Liked</span>
    </div>
  );
}
