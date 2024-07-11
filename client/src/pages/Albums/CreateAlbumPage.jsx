import React from "react";
import useCreateAlbum from "../../features/Albums/hooks/useCreateAlbum";
import AlbumCreateForm from "../../features/Albums/components/AlbumCreateForm";

export default function CreateAlbumPage() {
  const { createAlbum, isCreatingAlbum } = useCreateAlbum();
  return (
    <div className="h-full w-full overflow-scroll disable-scrollbars flex justify-center items-center">
      <AlbumCreateForm />
    </div>
  );
}
