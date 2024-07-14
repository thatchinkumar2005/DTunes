import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import useSong from "../../Songs/hooks/useSong";

export default function UserStrip({ id }) {
  const { user, isSuccess } = useGetUser({ id });

  const { song, isSuccess: gotSong } = useSong({ id: user?.currentPlaying });

  if (isSuccess)
    return (
      <div className="h-20 w-full bg-secondary rounded-lg flex flex-col gap-1 shrink-0 grow-0 justify-center p-2 ">
        <div className="w-full bg-secondary rounded-lg flex shrink-0 grow-0 justify-between items-center">
          <div className="flex gap-2 items-center">
            {user?.files?.profilePic ? (
              <img
                className="h-8 rounded-full mt-1"
                src={user?.files?.profilePic}
              />
            ) : (
              <FaRegUserCircle className="h-8 w-10 mt-1" />
            )}
            <Link to={`/user/${user._id}`} className="text-lg hover:underline">
              {user.fname}
            </Link>
          </div>
        </div>
        {gotSong && (
          <div className="text-sm text-green-500">
            Currently Playing:
            <Link
              to={`/song/${song._id}`}
              className="text-text hover:underline cursor-pointer"
            >
              {"  "}
              {song.name.length > 15 ? song.name.slice(14) : song.name}
            </Link>
          </div>
        )}
      </div>
    );
}
