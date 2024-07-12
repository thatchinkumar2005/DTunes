import React from "react";
import useGetUser from "../../Users/hooks/useGetUser";
import useFriendRespond from "../hooks/useFriendRespond";
import { useQueryClient } from "@tanstack/react-query";

export default function RequestStrip({ request }) {
  const { respond, isResponding } = useFriendRespond();
  const queryClient = useQueryClient();
  function handleAccept() {
    respond(
      { id: request._id, response: "accept" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["authUserFriendRequests"]);
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
          queryClient.invalidateQueries(["authUserFriendRequests"]);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  }
  const { user: requester, isSuccess } = useGetUser({ id: request.requester });
  if (isSuccess)
    return (
      <div className="w-full h-20 bg-primary flex flex-col md:flex-row justify-between md:items-center p-3 rounded-md">
        <span className="text-lg">{`${requester.fname} has requested to be your friend`}</span>
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            disabled={isResponding}
            className="hover:bg-green-500 p-1 px-2 rounded-lg duration-150 bg-button "
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            disabled={isResponding}
            className="hover:bg-red-500 p-1 px-2 rounded-lg duration-150 bg-button "
          >
            Reject
          </button>
        </div>
      </div>
    );
}
