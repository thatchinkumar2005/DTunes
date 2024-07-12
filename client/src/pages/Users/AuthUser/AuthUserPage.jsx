import React, { useEffect, useState } from "react";
import Spinner from "../../../ui/components/Spinner";
import { FaRegUserCircle } from "react-icons/fa";
import useGetAuthUser from "../../../features/Users/hooks/useGetAuthUser";
import UserPageSongs from "../../../features/Users/components/UserPageSongs";
import UserPageAlbums from "../../../features/Users/components/UserPageAlbums";
import AuthUserPlaylists from "../../../features/Users/components/AuthUserPlaylists";

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
    console.log(authUser);
  }, [authUser, isFethchedUser, setArtist]);

  return (
    <div className="h-full w-full disable-scrollbars overflow-scroll flex flex-col gap-10">
      {isGettingAuthUser && <Spinner />}
      {isFethchedUser && (
        <>
          <div className="flex justify-start w-full items-center p-3 h-52 border-b-2 md:gap-2 border-primary">
            <div>
              {authUser?.file?.profilePic ? (
                <div className="shrink-0 flex flex-col">
                  <img className="h-36 rounded-lg" src={song.files.coverArt} />
                </div>
              ) : (
                <FaRegUserCircle className="h-36 w-36 mb-2" />
              )}
            </div>
            <div className=" h-full p-4 flex flex-col gap-5 justify-between grow shrink-0">
              <div className="text-3xl">
                {authUser.fname + " " + authUser.lname}
              </div>
              <div className="flex justify-between items-center gap-20 ml-1">
                {artist && <span className="text-lg">Plays:</span>}
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
