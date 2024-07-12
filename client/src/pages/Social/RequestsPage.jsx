import React, { useEffect } from "react";
import RequestStrip from "../../features/Social/Components/RequestStrip";
import useGetAuthUserFriendRequests from "../../features/Social/hooks/useGetAuthUserFriendRequests";
import { useInView } from "react-intersection-observer";
import Spinner from "../../ui/components/Spinner";

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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="flex flex-col gap-3 p-3 overflow-scroll disable-scrollbars">
      {isError && <div>{error}</div>}
      {isPending && <Spinner />}
      {isSuccess &&
        requests.pages.map((page) =>
          page.data.map((request) => (
            <RequestStrip key={request._id} request={request} />
          ))
        )}
    </div>
  );
}
