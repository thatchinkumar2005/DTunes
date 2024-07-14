import React from "react";
import useGetAuthUserLikePlaylist from "../../features/Users/hooks/useGetAuthUserLikePlaylist";
import { Link } from "react-router-dom";
import useGetAuthUser from "../../features/Users/hooks/useGetAuthUser";
import useGetAuthUserPartyPlaylist from "../../features/Users/hooks/useGetAuthUserPartyPlaylist";
import useGetAuthUserParty from "../../features/Users/hooks/useGetAuthUserParty";

export default function LibraryPage() {
  const { data: likePlaylist, isSuccess: gotLikedPlaylist } =
    useGetAuthUserLikePlaylist();

  const { data: authUser, isSuccess: gotAuthUser } = useGetAuthUser();

  const { data: authUserParty, isSuccess: gotAuthUserParty } =
    useGetAuthUserParty();

  return (
    <div className="h-full w-full p-3 flex flex-col overflow-scroll disable-scrollbars gap-3">
      {gotAuthUser && (
        <h1 className="text-3xl font-bold self-center mt-3">{`${authUser.fname}'s Library`}</h1>
      )}
      {gotLikedPlaylist && (
        <div className="w-full flex bg-primary rounded-lg p-2">
          <div className="flex gap-3 items-center">
            <img className="h-16 rounded-lg" src="/LikedPlaylist.jpg" />
            <h1 className="text-3xl hover:underline">
              <Link to={`/playlist/${likePlaylist._id}`}>Liked</Link>
            </h1>
          </div>
        </div>
      )}
      {gotAuthUserParty && authUserParty && (
        <div className="w-full flex bg-primary rounded-lg p-2">
          <div className="flex gap-3 items-center">
            <img
              className="h-16 rounded-lg"
              src={authUserParty?.files?.coverArt || "/Playlist.jpg"}
            />
            <h1 className="text-3xl hover:underline">
              <Link to={`/playlist/${authUserParty.resultantPlaylist}`}>
                {authUserParty.name}
              </Link>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
