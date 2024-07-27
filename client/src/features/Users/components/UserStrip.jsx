import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import useDeleteFriend from "../../Social/hooks/useDeleteFriend";
import { useQueryClient } from "@tanstack/react-query";
import useSong from "../../Songs/hooks/useSong";
import useSocket from "../../../hooks/socket/useSocket";

export default function UserStrip({ id }) {
  const queryClient = useQueryClient();
  const { user, isSuccess } = useGetUser({ id });
  const { deleteFriend, isDeletingFriend } = useDeleteFriend();
  const { song, isSuccess: gotSong } = useSong({
    id: user?.queue?.currentSong,
  });
  const [online, setOnline] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    socket.emit("get-userStatus", { userId: id });
    socket.on("userStatus", (data) => {
      if (data.userId !== id) return;
      setOnline(data.online);
    });
    socket.on("update-user-queue", () => {
      queryClient.invalidateQueries(["artist"]);
    });
    return () => {
      socket.off("userStatus");
      socket.off("update-user-queue");
    };
  }, [id, socket, queryClient]);

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
      <div className="h-24 w-full bg-secondary rounded-lg flex flex-col gap-3 shrink-0 grow-0 justify-center p-3 ">
        <div className="w-full bg-secondary rounded-lg flex shrink-0 grow-0 justify-between items-center">
          <div className="flex gap-2 items-center">
            {user?.files?.profilePic ? (
              <img
                className="h-10 rounded-full mt-1"
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
        {gotSong && online && (
          <div className="text-md text-green-500">
            Currently Playing:
            <Link
              to={`/song/${song._id}`}
              className="text-text hover:underline cursor-pointer"
            >
              {"  "}
              {song.name}
            </Link>
          </div>
        )}
      </div>
    );
}
