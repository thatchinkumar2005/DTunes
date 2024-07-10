import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import { useParams } from "react-router-dom";
import useGetUser from "../../features/Users/hooks/useGetUser";
import Spinner from "../../ui/components/Spinner";
import { FaRegUserCircle } from "react-icons/fa";

export default function UserPage() {
  const { id } = useParams();
  const {
    user,
    isFetching: isGettingUser,
    isSuccess: isFethchedUser,
  } = useGetUser({ id });

  const [artist, setArtist] = useState(false);

  useEffect(() => {
    if (isFethchedUser) {
      if (user.roles?.artist === 2009) {
        setArtist(true);
      } else {
        setArtist(false);
      }
    }
    console.log(user);
  }, [user, isFethchedUser, setArtist]);

  return (
    <div className="h-full w-full disable-scrollbars overflow-scroll flex flex-col gap-10 p-2">
      {isGettingUser && <Spinner />}
      {isFethchedUser && (
        <>
          <div className="flex justify-start w-full items-center p-3 h-52 border-b-2 md:gap-2 border-primary">
            <div>
              {user?.file?.profilePic ? (
                <div className="shrink-0 flex flex-col">
                  <img className="h-36 rounded-lg" src={song.files.coverArt} />
                </div>
              ) : (
                <FaRegUserCircle className="h-36 w-36 mb-2" />
              )}
            </div>
            <div className=" h-full p-4 flex flex-col gap-5 justify-between grow shrink-0">
              <div className="text-3xl">{user.fname + " " + user.lname}</div>
              <div className="flex justify-between items-center gap-20 ml-1">
                {artist && <span className="text-lg">Plays:</span>}{" "}
                <button className="p-1 w-20 h-10 bg-primary rounded-lg">
                  request
                </button>
              </div>
            </div>
          </div>

          {artist && (
            <>
              <div className="h-48 md:h-64 w-full bg-primary rounded-lg p-3 disable-scrollbars grid grid-cols-3 md:grid-cols-4 gap-y-2 overflow-scroll shrink-0 grow-0">
                SONGS
              </div>
              <div className="h-48 md:h-64 w-full bg-primary rounded-lg p-3 disable-scrollbars grid grid-cols-3 md:grid-cols-4 gap-y-2 overflow-scroll shrink-0 grow-0">
                ALBUMS
              </div>
            </>
          )}

          <div className="h-48 md:h-64 w-full bg-primary rounded-lg p-3 disable-scrollbars grid grid-cols-3 md:grid-cols-4 gap-y-2 overflow-scroll shrink-0 grow-0">
            PLAYLISTS
          </div>
        </>
      )}
    </div>
  );
}
