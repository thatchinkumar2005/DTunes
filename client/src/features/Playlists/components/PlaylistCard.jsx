import React from "react";
import { Link } from "react-router-dom";

export default function PlaylistCard({ playlist }) {
  return (
    <div className="h-36 w-24 md:w-32 md:h-44 rounded-lg bg-secondary flex flex-col items-center p-1 gap-1">
      <img
        src={playlist.files.coverArt}
        className="h-20 w-20 rounded-lg md:h-28 md:w-28"
      />
      <Link
        to={`/playlist/${playlist._id}`}
        className="hover:underline self-start ml-2"
      >
        {playlist.name.length > 14
          ? `${playlist.name.slice(0, 13)}...`
          : playlist.name}
      </Link>
      <span className="self-end text-gray-500 text-xs">Playlist</span>
    </div>
  );
}
