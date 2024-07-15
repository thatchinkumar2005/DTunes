import React from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useDeleteAlbum from "../hooks/useDeleteAlbum";
import toast from "react-hot-toast";
import Modal from "../../../ui/components/Modal";
import ConfirmDeletePopUp from "./ConfirmDeletePopUp";

export default function AlbumDropDown({ album }) {
  return (
    <div className="flex flex-col justify-center items-start gap-3 py-2 w-32">
      <Modal
        ToggleElement={({ onClick }) => (
          <div
            onClick={onClick}
            className="flex gap-1 items-center justify-center"
          >
            <MdDelete className="fill-red-500" />
            <span>Delete Album</span>
          </div>
        )}
        album={album}
      >
        <ConfirmDeletePopUp />
      </Modal>
      <div className="flex gap-1 items-center justify-center">
        <IoMdAdd />
        <Link className="text-sm" to={`/song/create/${album._id}`}>
          New Song
        </Link>
      </div>
    </div>
  );
}
