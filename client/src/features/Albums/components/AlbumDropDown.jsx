import React from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useDeleteAlbum from "../hooks/useDeleteAlbum";
import toast from "react-hot-toast";

export default function AlbumDropDown({ album }) {
  const { mutate, isPending } = useDeleteAlbum();
  const navigate = useNavigate();
  function handleDelete() {
    mutate(album._id, {
      onSuccess: (data) => {
        console.log(data);
        toast("deleted album");
        navigate("/profile");
      },
    });
  }
  return (
    <div className="flex flex-col justify-center items-start gap-3 py-2 w-32">
      <div
        onClick={handleDelete}
        className="flex gap-1 items-center justify-center"
      >
        <MdDelete className="fill-red-500" />
        <span>Delete Playlist</span>
      </div>
      <div className="flex gap-1 items-center justify-center">
        <IoMdAdd />
        <Link className="text-sm" to={`/song/create/${album._id}`}>
          New Song
        </Link>
      </div>
    </div>
  );
}
