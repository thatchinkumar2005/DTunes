import React from "react";
import CreatePlaylistForm from "../../features/Playlists/components/CreatePlaylistForm";

export default function CreatePlaylistPage() {
  return (
    <div className="h-full w-full overflow-scroll disable-scrollbars flex justify-center p-2 items-center">
      <CreatePlaylistForm />
    </div>
  );
}
