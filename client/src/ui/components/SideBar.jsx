import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useGetAuthUserFriends from "../../features/Users/hooks/useGetAuthUserFriends";
import { useInView } from "react-intersection-observer";
import Spinner from "./Spinner";
import UserStripForSideBar from "../../features/Users/components/UserStripv2";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";
import { MdLibraryMusic } from "react-icons/md";

export default function SideBar() {
  const {
    authUserFriends,
    error,
    isError,
    isPending,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = useGetAuthUserFriends();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  return (
    <div className="row-start-4 bg-layout row-end-5 flex flex-row justify-center items-center md:col-start-1, md:col-end-2 md:row-start-2 md:row-end-4 md:flex-col ">
      <NavLink
        to={"/"}
        className="mx-8 text-sm md:hidden hover:scale-125  duration-100 active:text-blue-500 "
      >
        <IoHomeOutline className="h-7 w-7" />
      </NavLink>
      <NavLink
        to={"/search"}
        className="mx-8 text-sm md:hidden hover:scale-125  duration-100 active:text-blue-500 "
      >
        <IoIosSearch className="h-7 w-7" />
      </NavLink>
      <NavLink
        to={"/social"}
        className="mx-8 text-sm md:hidden hover:scale-125  duration-100 active:text-blue-500 "
      >
        <IoMdPeople className="h-7 w-7" />
      </NavLink>
      <NavLink
        to={"/library"}
        className="mx-8 text-sm md:hidden hover:scale-125 duration-100 active:text-blue-500 "
      >
        <MdLibraryMusic className="h-7 w-7" />
      </NavLink>

      <div className="hidden md:block p-3 h-full w-full">
        <div className="flex flex-col bg-primary w-full h-full gap-3 p-1 rounded-lg">
          <h1 className="text-3xl self-center">Friends</h1>
          <div className="flex flex-col justify-start items-center gap-3 overflow-scroll disable-scrollbars ">
            {isError && <div>{error}</div>}
            {isPending && <Spinner />}
            {isSuccess &&
              authUserFriends.pages.map((page) =>
                page.data.map((friend, i) => (
                  <UserStripForSideBar key={i} id={friend} />
                ))
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
