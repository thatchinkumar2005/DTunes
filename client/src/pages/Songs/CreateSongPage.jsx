import React from "react";
import CreateSongForm from "../../features/Songs/components/CreateSongForm";
import { useParams } from "react-router-dom";

export default function CreateSongPage() {
  const { albumId } = useParams();
  return (
    <div className="h-full w-full overflow-scroll disable-scrollbars flex justify-center items-center">
      <CreateSongForm albumId={albumId} />
    </div>
  );
}
