import React from "react";
import { MdDelete } from "react-icons/md";
import useDeleteSong from "../hooks/useDeleteSong";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "../../../ui/components/Modal";
import DeleteConfirmPopUp from "./DeleteConfirmPopUp";

export default function SongDropDown({ song }) {
  return (
    <div className="flex flex-col justify-center items-start  py-2 w-28">
      <Modal
        ToggleElement={({ onClick }) => (
          <div
            onClick={onClick}
            className="flex gap-1 items-center justify-center"
          >
            <MdDelete className="fill-red-500" />
            <span>Delete Song</span>
          </div>
        )}
        song={song}
      >
        <DeleteConfirmPopUp />
      </Modal>
    </div>
  );
}
