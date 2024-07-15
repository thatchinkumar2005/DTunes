import React from "react";
import { useNavigate } from "react-router-dom";
import useDeleteAlbum from "../hooks/useDeleteAlbum";
import toast from "react-hot-toast";

export default function ConfirmDeletePopUp({ setOpen, album }) {
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
    <div className="h-44 w-full flex flex-col justify-center items-center gap-3">
      <h1 className="text-orange-400 text-2xl">Warning</h1>
      <div className="text-lg">
        Are you sure you want to DELETE this Album? All the songs in the album
        will be deleted. You will not be able to recover it
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
