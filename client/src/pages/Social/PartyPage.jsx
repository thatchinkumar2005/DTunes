import React, { useEffect, useState } from "react";
import useGetAuthUserParty from "../../features/Users/hooks/useGetAuthUserParty";
import Spinner from "../../ui/components/Spinner";
import CreatePartyForm from "../../features/Social/Components/CreatePartyForm";
import useGetUser from "../../features/Users/hooks/useGetUser";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useGetPartyMembers from "../../features/Social/hooks/useGetPartyMembers";
import { useInView } from "react-intersection-observer";
import UserCard from "../../features/Users/components/UserCard";
import useAuth from "../../hooks/auth/useAuth";
import DropDown from "../../ui/components/DropDown";
import { CiMenuKebab } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import Modal from "../../ui/components/Modal";
import useSearch from "../../features/Search/hooks/useSearch";
import usePartyRequest from "../../features/Social/hooks/useRequestParty";
import toast from "react-hot-toast";
import useDeleteParty from "../../features/Social/hooks/useDeleteParty";
import { useQueryClient } from "@tanstack/react-query";
import SearchUsersPopUp from "../../features/Users/components/SearchUsersPopUp";
import PartyDropDown from "../../features/Social/Components/PartyDropDown";

function DropDownMenu({ onClick }) {
  return <CiMenuKebab onClick={onClick} className="h-5 w-5" />;
}

export default function PartyPage() {
  const { data: party, isPending: isGettingParty } = useGetAuthUserParty();

  const { user: leader, isPending: isGettingLeader } = useGetUser({
    id: party?.leader,
  });

  const { auth } = useAuth();

  const queryClient = useQueryClient();

  const [isOpen, setOpen] = useState(false);

  const {
    partyMembers,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useGetPartyMembers({ id: party?._id });

  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isGettingParty) return <Spinner />;
  return (
    <div className="h-full w-full p-3 flex flex-col overflow-scroll disable-scrollbars gap-3">
      {isGettingParty ? (
        <Spinner />
      ) : (
        party && (
          <>
            <div className="flex justify-start gap-3">
              <img
                src={
                  party?.file?.coverArt
                    ? party?.file?.coverArt
                    : "/Playlist.jpg"
                }
                className="h-32 w-32"
              />
              <div className="flex flex-col gap-3">
                <h1 className="self-start text-3xl font-bold">{party.name}</h1>

                <Link to={`/playlist/${party.resultantPlaylist}`}>
                  Party Playlist
                </Link>

                {auth.id === party.leader && (
                  <DropDown
                    ToggleButton={DropDownMenu}
                    dir={"right"}
                    className="top-0"
                  >
                    <PartyDropDown />
                  </DropDown>
                )}
              </div>
            </div>
            <div className="w-full h-0.5 bg-primary mt-3"></div>

            {isGettingLeader ? (
              <Spinner />
            ) : (
              leader && (
                <div className="w-full h-32 flex flex-col gap-2 rounded-lg bg-secondary mt-3 p-3">
                  <h1 className="font-bold text-2xl">Leader</h1>
                  <div className="h-14 w-full bg-primary rounded-lg flex shrink-0 grow-0 justify-between items-center p-1 ">
                    <div className="flex gap-2 items-center">
                      {leader?.files?.profilePic ? (
                        <img
                          className="h-16 rounded-full mt-1"
                          src={leader?.files?.profilePic}
                        />
                      ) : (
                        <FaRegUserCircle className="h-10 w-10 mt-1" />
                      )}
                      <Link
                        to={`/user/${leader._id}`}
                        className="text-2xl hover:underline"
                      >
                        {leader.fname}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )}

            <div className="shrink-0 w-full grow">
              <h1 className="text-xl">Members</h1>
              <div className=" md:h-40 w-full h-full bg-primary rounded-lg p-3 disable-scrollbars grid grid-cols-3 md:grid-cols-4 auto-rows-min gap-y-2 overflow-scroll">
                {isError && <div>{error}</div>}
                {isPending && <Spinner />}
                {isSuccess &&
                  partyMembers.pages.map((page) =>
                    page.data.map((member) => (
                      <div
                        key={member._id}
                        className="flex justify-center items-center"
                      >
                        <UserCard user={member} />
                      </div>
                    ))
                  )}
                <div ref={ref}></div>
              </div>
            </div>
          </>
        )
      )}
      {!party && <CreatePartyForm />}
    </div>
  );
}
