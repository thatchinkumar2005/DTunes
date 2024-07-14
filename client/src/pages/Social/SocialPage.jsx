import React, { useEffect } from "react";
import UserStrip from "../../features/Users/components/UserStrip";
import useGetAuthUserFriends from "../../features/Users/hooks/useGetAuthUserFriends";
import { useInView } from "react-intersection-observer";
import Spinner from "../../ui/components/Spinner";
import { Link } from "react-router-dom";

export default function SocialPage() {
  const {
    authUserFriends,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useGetAuthUserFriends();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <div className="h-full w-full overflow-scroll disable-scrollbars p-2 flex flex-col gap-2">
      <button className="w-full h-12 rounded-lg bg-button hover:underline hover:bg-primary duration-150">
        <Link to={"/party"}>Party</Link>
      </button>
      <h2 className="text-3xl font-bold">Friends</h2>
      <div className="grow overflow-scroll bg-primary rounded-lg p-2 disable-scrollbars flex flex-col gap-3">
        {isError && <div>{error}</div>}
        {isPending && <Spinner />}
        {isSuccess &&
          authUserFriends.pages.map((page) =>
            page.data.map((user, i) => <UserStrip key={i} id={user} />)
          )}
        <div ref={ref}></div>
      </div>
    </div>
  );
}
