import React, { useEffect } from "react";
import RequestStrip from "../../features/Social/Components/RequestStrip";
import useGetAuthUserFriendRequests from "../../features/Social/hooks/useGetAuthUserFriendRequests";
import { useInView } from "react-intersection-observer";
import Spinner from "../../ui/components/Spinner";
import useGetAuthUserPartyRequests from "../../features/Users/hooks/useGetAuthUserPartyRequests";
import PartyRequestStrip from "../../features/Social/Components/PartyRequestStrip.jsx";

export default function RequestsPage() {
  const {
    data: requests,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useGetAuthUserFriendRequests();

  const { ref, inView } = useInView();

  const {
    data: partyReqs,
    error: partyError,
    isError: isPartyError,
    isPending: isPartyPending,
    isSuccess: isPartySuccess,
    fetchNextPage: fetchNextPartyPage,
    hasNextPage: hasNextPartyPage,
  } = useGetAuthUserPartyRequests();

  const { partyRef, partyInView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    if (partyInView) {
      fetchNextPartyPage();
    }
  }, [partyInView, fetchNextPartyPage]);

  return (
    <div className="flex flex-col gap-3 p-3 overflow-scroll disable-scrollbars">
      <div className="w-full flex flex-col gap-2 p-3 bg-secondary shrink-0 overflow-scroll disable-scrollbars">
        <h1>Friend Requests</h1>
        {isError && <div>{error}</div>}
        {isPending && <Spinner />}
        {isSuccess &&
          requests.pages.map((page) =>
            page.data.map((request) => (
              <RequestStrip key={request._id} request={request} />
            ))
          )}
        <div ref={ref}></div>
      </div>
      <div className="w-full flex flex-col gap-2 p-3 bg-secondary shrink-0 overflow-scroll disable-scrollbars">
        <h1>Party Requests</h1>
        {isPartyError && <div>{partyError}</div>}
        {isPartyPending && <Spinner />}
        {isPartySuccess &&
          partyReqs.pages.map((page) =>
            page.data.map((request) => (
              <PartyRequestStrip key={request._id} request={request} />
            ))
          )}
        <div ref={partyRef}></div>
      </div>
    </div>
  );
}
