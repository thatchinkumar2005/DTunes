import React from "react";
import usePromoteArtist from "../Users/hooks/usePromoteArtist";
import { useQueryClient } from "@tanstack/react-query";

export default function ArtistConfirmPopUp({ setOpen: setOpenPromoteModal }) {
  const { promote, isPromoting } = usePromoteArtist();
  const queryClient = useQueryClient();
  return (
    <div className="h-32 w-full flex flex-col justify-center items-center gap-3">
      <div className="text-lg">Do you want to become an artist?</div>
      <div className="flex gap-3 items-center">
        <button
          onClick={() => {
            setOpenPromoteModal(false);
            promote(null, {
              onSuccess: (data) => {
                toast("Promoted to an artist account!", {
                  duration: 10000,
                });
                queryClient.invalidateQueries(["authUser"], ["artist"]);
              },
              onError: (err) => {
                toast(err.message, {
                  duration: 10000,
                });
              },
            });
          }}
          className="w-20 bg-primary p-2 rounded-lg hover:underline"
        >
          Yes
        </button>
        <button
          onClick={() => {
            setOpenPromoteModal(false);
          }}
          disabled={isPromoting}
          className="w-20 bg-primary p-2 rounded-lg hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
