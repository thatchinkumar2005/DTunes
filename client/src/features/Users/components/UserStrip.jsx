import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import useDeleteFriend from "../../Social/hooks/useDeleteFriend";
import { useQueryClient } from "@tanstack/react-query";

export default function UserStrip({ id }) {
  const queryClient = useQueryClient();
  const { user, isSuccess } = useGetUser({ id });
  const { deleteFriend, isDeletingFriend } = useDeleteFriend();

  function handleDelete() {
    deleteFriend(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["authUserFriends"]);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }
  if (isSuccess)
    return (
      <div className="h-14 w-full bg-secondary rounded-lg flex shrink-0 grow-0 justify-between items-center p-1 ">
        <div className="flex gap-2 items-center">
          {user?.files?.profilePic ? (
            <img
              className="h-16 rounded-full mt-1"
              src={user?.files?.profilePic}
            />
          ) : (
            <FaRegUserCircle className="h-10 w-10 mt-1" />
          )}
          <Link to={`/user/${user._id}`} className="text-2xl hover:underline">
            {user.fname}
          </Link>
        </div>

        <button
          onClick={handleDelete}
          disabled={isDeletingFriend}
          className="p-2 px-3 bg-primary duration-150 cursor-pointer hover:bg-red-500 rounded-lg"
        >
          remove
        </button>
      </div>
    );
}