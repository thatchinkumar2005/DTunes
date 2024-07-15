import React, { useEffect, useState } from "react";
import useGetUser from "../../Users/hooks/useGetUser";
import useFriendRespond from "../hooks/useFriendRespond";
import { useQueryClient } from "@tanstack/react-query";
import useGetParty from "../hooks/useGetParty";
import usePartyRespond from "../hooks/usePartyRespond";
import Modal from "../../../ui/components/Modal";
import useAuth from "../../../hooks/auth/useAuth";
import useGetUserPlaylists from "../../Users/hooks/useGetUserPlaylists";
import { useInView } from "react-intersection-observer";
import Spinner from "../../../ui/components/Spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import PublicPlaylistsPopUp from "../../Playlists/components/PublicPlaylistsPopUp";

function ModalToggleButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-green-500 p-1 px-2 rounded-lg duration-150 bg-button "
    >
      Accept
    </button>
  );
}

export default function PartyRequestStrip({ request }) {
  const queryClient = useQueryClient();

  const { respond, isResponding } = usePartyRespond();

  function handleAccept(playlistId) {
    respond(
      { id: request._id, response: "accept", contribPlaylistId: playlistId },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["authUserFriendRequests"]);
          toast("Joined Party!");
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  }
  function handleReject() {
    respond(
      { id: request._id, response: "reject" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["authUserPartyRequests"]);
          toast("rejected!");
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  }

  const { party } = useGetParty({ id: request.party });

  const { user: leader } = useGetUser({
    id: party?.leader,
  });

  // if (gotParty && gotLeader)
  return (
    <div className="w-full h-20 bg-primary flex flex-col md:flex-row justify-between md:items-center p-3 rounded-md">
      <span className="text-lg">
        <Link
          to={`/user/${leader?._id}`}
          className="hover:underline"
        >{`${leader?.fname}`}</Link>
        {` has invited you to their party`}
      </span>
      <div className="flex gap-2">
        <Modal
          ToggleElement={ModalToggleButton}
          handleSelectPlaylist={handleAccept}
        >
          <PublicPlaylistsPopUp />
        </Modal>
        <button
          onClick={handleReject}
          className="hover:bg-red-500 p-1 px-2 rounded-lg duration-150 bg-button "
        >
          Reject
        </button>
      </div>
    </div>
  );
}
