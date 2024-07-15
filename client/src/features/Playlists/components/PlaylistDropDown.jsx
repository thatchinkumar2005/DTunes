import React from "react";
import useDeletePlaylist from "../hooks/useDeletePlaylist";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

export default function PlaylistDropDown({ playlist }) {
  const { mutate, isPending } = useDeletePlaylist();
  const navigate = useNavigate();
  function handleDelete() {
    mutate(playlist._id, {
      onSuccess: () => {
        toast("Deleted Playlist");
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
    </div>
  );
}
