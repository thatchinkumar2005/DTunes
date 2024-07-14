import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useGetAuthUser from "../../features/Users/hooks/useGetAuthUser";
import DropDown from "./DropDown";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineProfile } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

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
  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <div className="flex bg-layout flex-row items-center md:gap-3 md:col-start-1 md:col-end-3 border-b-2 border-primary">
      <h1 className="text-2xl md:text-2xl mx-3">Dtunes</h1>
      <NavLink
        to={"/"}
        className="hidden md:block mx-8 text-sm hover:scale-125 duration-100 "
      >
        Home
      </NavLink>
      <NavLink
        to={"/search"}
        className="hidden md:block mx-8 text-sm hover:scale-125 duration-100 "
      >
        Search
      </NavLink>
      <NavLink
        to={"/social"}
        className="hidden md:block mx-8 text-sm hover:scale-125 duration-100 "
      >
        Social
      </NavLink>
      <NavLink
        to={"/library"}
        className="hidden md:block mx-8 text-sm hover:scale-125 duration-100 "
      >
        Library
      </NavLink>

      <div className="mt-1 ml-auto flex gap-5 items-center">
        <Link to={"/requests"}>
          <FaHeart className="w-5 h-5 hover:fill-red-500 duration-150" />
        </Link>
        <DropDown
          ToggleButton={ProfileButton}
          isOpen={openDropDown}
          setOpen={setOpenDropDown}
          className={"top-5 "}
        >
          <div className="flex flex-col gap-1 px-3 py-1">
            <div className="flex gap-1 items-center text-md">
              <AiOutlineProfile />
              <Link
                onClick={() => {
                  setOpenDropDown(false);
                }}
                to={"/profile"}
                className="hover:underline"
              >
                Profile
              </Link>
            </div>
            <div className="flex gap-1 items-center">
              <MdManageAccounts />
              <Link
                to={"/accounts"}
                onClick={() => {
                  setOpenDropDown(false);
                }}
                className="hover:underline"
              >
                Account
              </Link>
            </div>
            <div className="flex gap-1 items-center">
              <CiLogout />
              <Link
                onClick={() => {
                  setOpenDropDown(false);
                }}
                to="/auth/logout"
                className="hover:underline"
              >
                Logout
              </Link>
            </div>
          </div>
        </DropDown>
      </div>
    </div>
  );
}
