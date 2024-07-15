import React, { useEffect, useState } from "react";
import Spinner from "../../../ui/components/Spinner";
import { FaRegUserCircle } from "react-icons/fa";
import useGetAuthUser from "../../../features/Users/hooks/useGetAuthUser";
import UserPageSongs from "../../../features/Users/components/UserPageSongs";
import UserPageAlbums from "../../../features/Users/components/UserPageAlbums";
import AuthUserPlaylists from "../../../features/Users/components/AuthUserPlaylists";
import { Link } from "react-router-dom";
import useGetArtistPlays from "../../../features/Users/hooks/useGetArtistPlays";

let formatter = Intl.NumberFormat("en", { notation: "compact" });

export default function AuthUserPage() {
  const {
    data: authUser,
    isPending: isGettingAuthUser,
    isSuccess: isFethchedUser,
  } = useGetAuthUser();

  const [artist, setArtist] = useState(false);

  useEffect(() => {
    if (isFethchedUser) {
      if (authUser.roles?.artist === 2009) {
        setArtist(true);
      } else {
        setArtist(false);
      }
    }
  }, [authUser, isFethchedUser, setArtist]);

  const {
    data: plays,
    isPending: isGettingPlays,
    isSuccess: gotPlays,
  } = useGetArtistPlays({ id: authUser?._id });

  return (
    <div className="h-full w-full disable-scrollbars overflow-scroll flex flex-col gap-10">
      {isGettingAuthUser && <Spinner />}
      {isFethchedUser && (
        <>
          <div className="flex justify-start w-full items-center p-3 h-auto border-b-2 md:gap-2 border-primary shrink-0">
            <div className=" shrink-0">
              {authUser?.files?.profilePic ? (
                <img
                  className="h-36 rounded-full"
                  src={authUser?.files?.profilePic}
                />
              ) : (
                <FaRegUserCircle className="h-36 w-36 mb-2" />
              )}
            </div>
            <div className=" h-full p-4 flex flex-col gap-5 justify-between grow shrink-0">
              <div className="text-3xl">{authUser.fname}</div>
              <div className="text-lg ml-1">{authUser?.bio}</div>
              <div className="flex justify-between items-center gap-20 ml-1">
                {artist && (
                  <span className="text-lg text-gray-500">
                    Plays:{" "}
                    {isGettingPlays ? (
                      <Spinner />
                    ) : plays[0] ? (
                      formatter.format(plays[0].totalPlays)
                    ) : (
                      0
                    )}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {artist && (
                  <Link
                    to={"/album/create"}
                    className="bg-secondary p-2 rounded-lg hover:underline"
                  >
                    New Album
                  </Link>
                )}
                <Link
                  to={"/playlist/create"}
                  className="bg-secondary p-2 rounded-lg hover:underline"
                >
                  New Playlist
                </Link>
              </div>
            </div>
          </div>

          {artist && (
            <>
              <div className="px-6 grow-0 shrink-0">
                <h2>Releases</h2>
                <UserPageSongs id={authUser._id} />
              </div>
              <div className="px-6 grow-0 shrink-0">
                <h2>Albums</h2>
                <UserPageAlbums id={authUser._id} />
              </div>
            </>
          )}

          <div className="px-6 grow-0 shrink-0">
            <h2>Playlists</h2>
            <AuthUserPlaylists />
          </div>
        </>
      )}
    </div>
  );
}
