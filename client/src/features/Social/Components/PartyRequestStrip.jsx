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

  const [isOpen, setOpen] = useState(false);

  const { respond, isResponding } = usePartyRespond();

  function handleAccept(playlistId) {
    respond(
      { id: request._id, response: "accept", contribPlaylistId: playlistId },
      {
        onSuccess: (data) => {
          console.log(data);
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

  const { auth } = useAuth();

  const {
    userPlaylists,
    isError,
    isPending,
    isSuccess,
    error: playlistsError,
    fetchNextPage,
    hasNextPage,
  } = useGetUserPlaylists({ id: auth.id });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

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
          isOpen={isOpen}
          setOpen={setOpen}
        >
          <div className="w-72 h-96 flex flex-col ">
            {isError && <div>{playlistsError}</div>}
            {isPending && <Spinner />}
            {isSuccess &&
              userPlaylists.pages.map((page) =>
                page.data.map((playlist) => (
                  <div
                    key={playlist._id}
                    onClick={() => {
                      handleAccept(playlist._id);
                    }}
                    className="h-14 w-full bg-secondary rounded-lg flex shrink-0 grow-0 justify-start items-center gap-3"
                  >
                    <img
                      className="h-10 grow-0"
                      src={
                        playlist?.like
                          ? "/LikedPlaylist.jpg"
                          : playlist?.files?.coverArt
                          ? playlist?.files?.coverArt
                          : "/Playlist.jpg"
                      }
                      alt="cover art"
                    />
                    <div className="w-32 h-12 grow-0 flex justify-start items-center hover:underline">
                      {playlist.name.length > 20
                        ? `${playlist.name.slice(0, 19)}...`
                        : playlist.name}
                    </div>
                  </div>
                ))
              )}
            <div ref={ref}>{hasNextPage && <Spinner />}</div>
          </div>
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
