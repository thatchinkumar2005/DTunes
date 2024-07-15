import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useGetAuthUser from "../../features/Users/hooks/useGetAuthUser";
import DropDown from "./DropDown";
import { FaRegUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import ProfileDropDown from "./ProfileDropDown";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";
import { MdLibraryMusic } from "react-icons/md";

function ProfileButton({ onClick }) {
  const { data: user } = useGetAuthUser();
  return (
    <>
      {user?.files?.profilePic ? (
        <img
          className="h-10 rounded-full "
          src={user?.files?.profilePic}
          onClick={onClick}
        />
      ) : (
        <FaRegUserCircle onClick={onClick} className="h-10 w-10 ml-auto" />
      )}
    </>
  );
}

export default function NavBar() {
  return (
    <div className="flex bg-layout flex-row items-center md:gap-3 md:col-start-1 md:col-end-3 border-b-2 border-primary">
      <span className=" mx-3 flex items-center gap-2">
        <img src="/logo.png" className=" h-14 md:h-16 rounded-lg" />
      </span>
      <NavLink
        to={"/"}
        className="hidden md:block mx-8 text-sm hover:scale-125 duration-100 "
      >
        <IoHomeOutline className="h-5 w-5" />
      </NavLink>
      <NavLink
        to={"/search"}
        className="hidden md:block mx-8 text-sm hover:scale-125 duration-100 "
      >
        <IoIosSearch className="h-5 w-5" />
      </NavLink>
      <NavLink
        to={"/social"}
        className="hidden md:block mx-8 text-sm hover:scale-125 duration-100 "
      >
        <IoMdPeople className="h-5 w-5" />
      </NavLink>
      <NavLink
        to={"/library"}
        className="hidden md:block mx-8 text-sm hover:scale-125 duration-100 "
      >
        <MdLibraryMusic className="h-5 w-5" />
      </NavLink>

      <div className="mt-1 ml-auto flex gap-5 items-center">
        <Link to={"/requests"}>
          <FaHeart className="w-5 h-5 hover:fill-red-500 duration-150" />
        </Link>
        <DropDown ToggleButton={ProfileButton} className={"top-5 "}>
          <ProfileDropDown />
        </DropDown>
      </div>
    </div>
  );
}
