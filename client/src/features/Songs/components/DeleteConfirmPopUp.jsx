import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useDeleteSong from "../hooks/useDeleteSong";

export default function DeleteConfirmPopUp({ setOpen, song }) {
  const navigate = useNavigate();
  const { mutate, isPending } = useDeleteSong();
  function handleDelete(e) {
    e.preventDefault();
    mutate(song._id, {
      onSuccess: (data) => {
        toast("Song Deleted!");
        navigate("/profile");
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }
  return (
    <div className="h-36 w-full flex flex-col justify-center items-center gap-3">
      <h1 className="text-orange-400 text-2xl">Warning</h1>
      <div className="text-lg">
        Are you sure you want to DELETE this Song? You will not be able to
        recover it
      </div>
      <div className="flex gap-3 items-center">
        <button
          onClick={handleDelete}
          className="w-20 bg-primary p-2 rounded-lg hover:underline"
        >
          Yes
        </button>
        <button
          onClick={() => {
            setOpen(false);
          }}
          className="w-20 bg-primary p-2 rounded-lg hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
