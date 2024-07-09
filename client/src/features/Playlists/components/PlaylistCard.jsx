import React from "react";
import { Link } from "react-router-dom";

export default function PlaylistCard({ playlist }) {
  return (
    <div className="h-40 w-28 md:h-52 md:w-36 rounded-lg bg-secondary flex flex-col items-center p-1 gap-1">
      <img
        src={playlist.files.coverArt}
        className="h-30 w-30 rounded-lg md:h-28 md:w-28"
      />
      <Link
        to={`/playlist/${playlist._id}`}
        className="hover:underline self-start md:text-2xl"
      >
        {playlist.name.length > 14
          ? `${playlist.name.slice(0, 13)}...`
          : playlist.name}
      </Link>
      <span className="self-end text-gray-500 text-xs mt-auto">Playlist</span>
    </div>
  );
}
