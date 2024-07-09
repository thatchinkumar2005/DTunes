import React from "react";
import LikedPlaylistHomePageCard from "../../features/UX/components/LikedPlaylistHomePageCard";
import LibraryHomePageCard from "../../features/UX/components/LibraryHomePageCard";
import RecommendedSongsHomePage from "../../features/UX/components/RecommendedSongsHomePage";

export default function HomePage() {
  return (
    <div className="h-full w-full flex flex-col justify-start">
      <div className="grid grid-cols-2 h-auto w-auto p-10 px-6 gap-5 ">
        <LikedPlaylistHomePageCard />
        <LibraryHomePageCard />
      </div>
      <div className="px-6 flex flex-col">
        <h1 className="text-xl">Top Recommendations</h1>
        <RecommendedSongsHomePage />
      </div>
    </div>
  );
}
