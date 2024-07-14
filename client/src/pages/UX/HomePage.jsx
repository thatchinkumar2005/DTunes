import React, { useEffect } from "react";
import LikedPlaylistHomePageCard from "../../features/UX/components/LikedPlaylistHomePageCard";
import LibraryHomePageCard from "../../features/UX/components/LibraryHomePageCard";
import RecommendedSongsHomePage from "../../features/UX/components/RecommendedSongsHomePage";
import TopArtistsHomePage from "../../features/UX/components/TopArtistsHomePage";
import AlbumsHomePage from "../../features/UX/components/AlbumsHomePage";
import PlaylistsHomePage from "../../features/UX/components/PlaylistsHomePage";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useGetAuthUser from "../../features/Users/hooks/useGetAuthUser";

export default function HomePage() {
  const { data: user, isSuccess } = useGetAuthUser();

  useEffect(() => {
    if (isSuccess) {
      if (!user?.files?.profilePic) {
        toast(
          (t) => (
            <div className="flex flex-col h-20 justify-center items-center gap-3">
              <span>Update your profile Picture</span>
              <div className="flex flex-row justify-center items-center gap-3">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="bg-primary rounded-lg p-2 w-20 hover:underline"
                >
                  <Link to={"/profile/edit"}>Update</Link>
                </button>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="bg-primary rounded-lg p-2 w-20 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          ),
          {
            duration: Infinity,
            id: "UpdateToast",
          }
        );
      }
    }
  }, [isSuccess, user]);

  return (
    <div className="h-full w-full flex flex-col justify-start gap-5 overflow-scroll disable-scrollbars">
      <div className="grid grid-cols-2 h-auto w-auto p-10 px-6 gap-5 ">
        <LikedPlaylistHomePageCard />
        <LibraryHomePageCard />
      </div>
      <div className="px-6 grow-0 shrink-0">
        <h1 className="text-xl">Top Recommendations</h1>
        <RecommendedSongsHomePage />
      </div>
      <div className="px-6 grow-0 shrink-0">
        <h1 className="text-xl">Artists</h1>
        <TopArtistsHomePage />
      </div>
      <div className="px-6 grow-0 shrink-0">
        <h1 className="text-xl">Albums</h1>
        <AlbumsHomePage />
      </div>
      <div className="px-6 grow-0 shrink-0">
        <h1 className="text-xl">Playlists</h1>
        <PlaylistsHomePage />
      </div>
    </div>
  );
}
