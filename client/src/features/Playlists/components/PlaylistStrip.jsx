import React, { act, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { GoPlus } from "react-icons/go";
import { SiTicktick } from "react-icons/si";
import useToggleSong from "../../Songs/hooks/useToggleSong";
import useCheckSongExists from "../hooks/useCheckSongExists";

export default function PlaylistStrip({ playlist, songId }) {
  const queryClient = useQueryClient();
  const { toggle, isToggling } = useToggleSong();
  const [inPlaylist, setInPlaylist] = useState(false);

  function handleAdd() {
    toggle(
      { playlistId: playlist._id, songId },
      {
        onSuccess: (data) => {
          if (data.message === "song removed") {
            setInPlaylist(false);
          } else {
            setInPlaylist(true);
          }
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  }

  return (
    <div className="h-14 w-full bg-secondary rounded-lg flex shrink-0 grow-0 justify-between items-center">
      <div className="flex gap-2 justify-center items-center grow-0 overflow-hidden ml-2">
        <img
          className="h-10 grow-0"
          src={playlist?.files?.coverArt}
          alt="cover art"
        />
        <div className="w-32 h-12 grow-0 flex justify-start items-center hover:underline">
          {playlist.name.length > 15
            ? `${playlist.name.slice(0, 14)}...`
            : playlist.name}
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 mr-2">
        <div onClick={handleAdd}>
          {inPlaylist ? <SiTicktick /> : <GoPlus />}
        </div>
      </div>
    </div>
  );
}
