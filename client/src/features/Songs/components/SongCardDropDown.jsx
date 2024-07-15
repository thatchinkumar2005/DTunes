import React from "react";
import Modal from "../../../ui/components/Modal";
import PlaylistsListPopUp from "../../Playlists/components/PlaylistsListPopUp";

function AddToPlaylistBtn({ onClick }) {
  return (
    <div onClick={onClick} className="text-sm text-center">
      Add To Playlist
    </div>
  );
}

export default function SongCardDropDown({ song }) {
  return (
    <div className="flex flex-col justify-center items-center w-32 h-8 ">
      <Modal ToggleElement={AddToPlaylistBtn} song={song}>
        <PlaylistsListPopUp />
      </Modal>
    </div>
  );
}
