import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import useGetUser from "../../features/Users/hooks/useGetUser";
import Spinner from "../../ui/components/Spinner";
import { FaRegUserCircle } from "react-icons/fa";
import UserPageSongs from "../../features/Users/components/UserPageSongs";
import UserPageAlbums from "../../features/Users/components/UserPageAlbums";
import UserPagePlaylists from "../../features/Users/components/UserPagePlaylists";
import useGetAuthUserFrndReln from "../../features/Users/hooks/useGetAuthUserFrndReln";
import useFriendRequest from "../../features/Social/hooks/useFriendRequest";
import { useQueryClient } from "@tanstack/react-query";

export default function UserPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    user,
    isFetching: isGettingUser,
    isSuccess: isFethchedUser,
  } = useGetUser({ id });

  const { auth } = useAuth();

  useEffect(() => {
    if (isFethchedUser) {
      if (auth.id === user._id) {
        navigate("/profile");
      }
    }
  });

  const [artist, setArtist] = useState(false);

  const { data: frndReln, isSuccess: gotFrndReln } = useGetAuthUserFrndReln({
    id,
  });

  const { request, isRequesting } = useFriendRequest();

  function handleRequest() {
    if (frndReln?.status === "accepted") {
      return;
    }
    if (isFethchedUser)
      request(user._id, {
        onSuccess: () => {
          queryClient.invalidateQueries(["authUserFrndReln", id]);
        },
        onError: (err) => {
          console.log(err);
        },
      });
  }

  useEffect(() => {
    if (isFethchedUser) {
      if (user.roles?.artist === 2009) {
        setArtist(true);
      } else {
        setArtist(false);
      }
    }
  }, [user, isFethchedUser, setArtist]);

  return (
    <div className="h-full w-full disable-scrollbars overflow-scroll flex flex-col gap-10">
      {isGettingUser && <Spinner />}
      {isFethchedUser && (
        <>
          <div className="flex justify-start w-full items-center p-3 h-auto border-b-2 md:gap-2 border-primary ">
            <div className=" shrink-0">
              {user?.files?.profilePic ? (
                <img
                  className="h-36 rounded-full shrink-0"
                  src={user?.files?.profilePic}
                />
              ) : (
                <FaRegUserCircle className="h-36 w-36 mb-2 stroke-black" />
              )}
            </div>
            <div className=" h-full p-4 pr-1 flex flex-col gap-5 justify-between grow shrink-0">
              <div className="text-3xl">{user.fname + " " + user.lname}</div>
              <div className="text-lg text-gray-500 ml-1">{user?.bio}</div>
              <div className="flex justify-between items-center ml-1">
                {artist && <span className="text-lg">Plays:</span>}
                {(frndReln?.status === "rejected" || !frndReln) && (
                  <button
                    onClick={handleRequest}
                    disabled={isRequesting}
                    className="p-4 w-20 h-10 mr-1 bg-button rounded-lg hover:bg-gray-500 duration-150 flex justify-center items-center"
                  >
                    Request
                  </button>
                )}
                {frndReln?.status === "requested" && (
                  <button
                    onClick={handleRequest}
                    disabled={isRequesting}
                    className="p-4 w-20 h-10 mr-1 bg-button rounded-lg hover:bg-gray-500 duration-150 flex justify-center items-center"
                  >
                    Requested
                  </button>
                )}
                {frndReln && frndReln?.status === "accepted" && (
                  <span>Friends</span>
                )}
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
                <UserPageAlbums id={id} />
              </div>
            </>
          )}

          <div className="px-6 grow-0 shrink-0">
            <h2>Playlists</h2>
            <UserPagePlaylists id={id} />
          </div>
        </>
      )}
    </div>
  );
}
