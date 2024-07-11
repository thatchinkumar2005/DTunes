import React from "react";
import useCreateAlbum from "../../features/Albums/hooks/useCreateAlbum";
import AlbumCreateForm from "../../features/Albums/components/AlbumCreateForm";
import useAuth from "../../hooks/auth/useAuth";
import { Navigate } from "react-router-dom";

export default function CreateAlbumPage() {
  return (
    <div className="h-full w-full overflow-scroll disable-scrollbars flex justify-center items-center">
      <AlbumCreateForm />
    </div>
  );
}
