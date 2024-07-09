import React from "react";
import SongCard from "../../Songs/components/SongCard";

export default function RecommendedSongsHomePage() {
  return (
    <div className="h-48 bg-primary rounded-lg p-3 flex flex-col gap-3 overflow-scroll disable-scrollbars">
      <SongCard
        song={{
          files: {
            audio:
              "http://localhost:7777/serverStorage/Songs/668937a10b547094c7b1af8b.mp3",
            coverArt:
              "http://localhost:7777/serverStorage/CoverArt/668937a10b547094c7b1af8b.png",
          },
          _id: "668937a10b547094c7b1af8b",
          name: "Sweet Home Alabama Sweet Home Alabama",
          artists: ["66893527709afbbe20927466"],
          album: "668935a3709afbbe20927475",
          genre: ["pop"],
          releaseDate: "2024-07-06T12:25:05.806Z",
          __v: 0,
        }}
      />
    </div>
  );
}
