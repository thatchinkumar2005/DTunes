import React from "react";
import useDeletePlaylist from "../hooks/useDeletePlaylist";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Modal from "../../../ui/components/Modal";
import DeleteConfirmPopUp from "./DeleteConfirmPopUp";

export default function PlaylistDropDown({ playlist }) {
  return (
    <div className="flex flex-col justify-center items-start py-2 w-32">
      <Modal
        ToggleElement={({ onClick }) => (
          <div
            onClick={onClick}
            className="flex gap-1 items-center justify-center"
          >
            <MdDelete className="fill-red-500" />
            <span>Delete Playlist</span>
          </div>
        )}
        playlist={playlist}
      >
        <DeleteConfirmPopUp />
      </Modal>
    </div>
  );
}
