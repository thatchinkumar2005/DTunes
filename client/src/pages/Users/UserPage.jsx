import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import { useParams } from "react-router-dom";
import useGetUser from "../../features/Users/hooks/useGetUser";
import Spinner from "../../ui/components/Spinner";
import { FaRegUserCircle } from "react-icons/fa";
import UserPageSongs from "../../features/Users/components/UserPageSongs";

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
    <div className="h-full w-full disable-scrollbars overflow-scroll flex flex-col gap-10">
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
                <button className="p-1 w-20 h-10 bg-secondary rounded-lg hover:bg-gray-500 duration-150">
                  request
                </button>
              </div>
            </div>
          </div>

          {artist && (
            <>
              <div className="px-6 grow-0 shrink-0">
                <h2>Releases</h2>
                <UserPageSongs id={id} />
              </div>
              <div className="px-6 grow-0 shrink-0">
                <h2>Albums</h2>
              </div>
            </>
          )}

          <div className="px-6 grow-0 shrink-0">
            <h2>Playlists</h2>
          </div>
        </>
      )}
    </div>
  );
}
