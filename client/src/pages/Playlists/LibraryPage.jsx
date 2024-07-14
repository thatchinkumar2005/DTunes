import React from "react";
import useGetAuthUserLikePlaylist from "../../features/Users/hooks/useGetAuthUserLikePlaylist";
import { Link } from "react-router-dom";
import useGetAuthUser from "../../features/Users/hooks/useGetAuthUser";
import useGetAuthUserPartyPlaylist from "../../features/Users/hooks/useGetAuthUserPartyPlaylist";
import useGetAuthUserParty from "../../features/Users/hooks/useGetAuthUserParty";
import useGetAuthUserPlaylists from "../../features/Users/hooks/useGetAuthUserPlaylists";
import { useInView } from "react-intersection-observer";
import Spinner from "../../ui/components/Spinner";

export default function LibraryPage() {
  const { data: likePlaylist, isSuccess: gotLikedPlaylist } =
    useGetAuthUserLikePlaylist();

  const { data: authUser, isSuccess: gotAuthUser } = useGetAuthUser();

  const { data: authUserParty, isSuccess: gotAuthUserParty } =
    useGetAuthUserParty();

  const {
    authUserPlaylists,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useGetAuthUserPlaylists();
  const { inView, ref } = useInView();

  return (
    <div className="h-full w-full p-3 flex flex-col overflow-scroll disable-scrollbars gap-3">
      {gotAuthUser && (
        <h1 className="text-3xl font-bold self-center mt-3">{`${authUser.fname}'s Library`}</h1>
      )}
      <div className="bg-secondary flex flex-col gap-3 p-3">
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
                src={authUserParty?.file?.coverArt || "/Playlist.jpg"}
              />
              <h1 className="text-3xl hover:underline">
                <Link to={`/playlist/${authUserParty.resultantPlaylist}`}>
                  Party Playlist
                </Link>
              </h1>
            </div>
          </div>
        )}
      </div>
      <div className="bg-primary flex flex-col gap-3 p-3 overflow-scroll disable-scrollbars grow">
        <h1 className="text-3xl">Playlists</h1>
        {isError && <div>{error}</div>}
        {isPending && <Spinner />}
        {isSuccess &&
          authUserPlaylists.pages.map((page) =>
            page.data.map((playlist) => (
              <div
                className="w-full h-18 bg-secondary rounded-lg shrink-0 grow-0 flex justify-between items-center p-2"
                key={playlist._id}
              >
                <div className="flex gap-3 items-center">
                  <img
                    className="h-12"
                    src={
                      playlist.like
                        ? "/LikedPlaylist.jpg"
                        : playlist?.files?.coverArt || "/Playlist.jpg"
                    }
                  />
                  <h3 className="hover:underline">
                    <Link to={`/playlist/${playlist._id}`}>
                      {playlist?.name}
                    </Link>
                  </h3>
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  );
}
