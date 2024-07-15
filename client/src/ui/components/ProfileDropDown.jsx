import React from "react";
import { AiOutlineProfile } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProfileDropDown({ setOpen: setOpenDropDown }) {
  return (
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
  );
}
