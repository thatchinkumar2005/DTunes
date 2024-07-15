import React from "react";
import { MdDelete } from "react-icons/md";
import Modal from "../../../ui/components/Modal";
import SearchUsersPopUp from "../../Users/components/SearchUsersPopUp";
import useDeleteParty from "../hooks/useDeleteParty";
import { IoAddOutline } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function ModalOpenButton({ onClick }) {
  return (
    <div onClick={onClick} className="flex gap-1 items-center justify-center">
      <IoAddOutline className="" />
      <span>Add Members</span>
    </div>
  );
}

export default function PartyDropDown() {
  const { deleteParty, isPending: isDeleting } = useDeleteParty();
  const queryClient = useQueryClient();

  function handleDelete() {
    deleteParty(null, {
      onSuccess: () => {
        toast("Deleted Party!");
        queryClient.invalidateQueries(["authUserParty"]);
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
        <span>Delete Party</span>
      </div>
      <Modal ToggleElement={ModalOpenButton}>
        <SearchUsersPopUp />
      </Modal>
    </div>
  );
}
