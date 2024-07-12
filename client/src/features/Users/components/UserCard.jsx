import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <div className="w-24 h-28 rounded-lg bg-secondary md:w-32 md:h-36 flex flex-col items-center justify-start gap-2 grow-0 shrink-0 ">
      {user?.files?.profilePic ? (
        <img className="h-16 rounded-full mt-1" src={user?.files?.profilePic} />
      ) : (
        <FaRegUserCircle className="h-16 w-16 md:h-24 md:w-24 mt-1" />
      )}
      <Link to={`/user/${user._id}`} className="hover:underline">
        {(user.fname + user.lname).length > 12
          ? `${(user.fname + " " + user.lname).slice(0, 11)}...`
          : user.fname + " " + user.lname}
      </Link>
      <span className="self-end text-gray-500 text-xs mr-2 mb-1">
        {user.roles?.artist === 2009 ? "Artist" : "User"}
      </span>
    </div>
  );
}
