import React from "react";
import { MdDelete } from "react-icons/md";
import useDeleteSong from "../hooks/useDeleteSong";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SongDropDown({ song }) {
  const navigate = useNavigate();
  const { mutate, isPending } = useDeleteSong();
  function handleDelete(e) {
    e.preventDefault();
    mutate(song._id, {
      onSuccess: (data) => {
        toast("Song Deleted");
        navigate("/profile");
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }
  return (
    <div className="flex flex-col justify-center items-start gap-3 py-2 w-28">
      <div
        onClick={handleDelete}
        className="flex gap-1 items-center justify-center"
      >
        <MdDelete className="fill-red-500" />
        <span>Delete Song</span>
      </div>
    </div>
  );
}
