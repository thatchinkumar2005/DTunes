import React from "react";
import { Link } from "react-router-dom";

export default function AlbumCard({ album }) {
  return (
    <div className="h-40 w-28 md:h-52 md:w-36 rounded-lg bg-secondary flex flex-col items-center p-1 gap-1">
      <img
        src={album.files.coverArt}
        className="h-30 w-30 rounded-lg md:h-28 md:w-28"
      />
      <Link
        to={`/album/${album._id}`}
        className="hover:underline self-start md:text-2xl"
      >
        {album.name.length > 12 ? `${album.name.slice(0, 11)}...` : album.name}
      </Link>
      <span className=" self-end text-gray-500 text-xs mt-auto">Album</span>
    </div>
  );
}
