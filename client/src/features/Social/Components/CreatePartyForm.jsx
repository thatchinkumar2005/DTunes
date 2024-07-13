import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import DropDown from "../../../ui/components/DropDown";
import Modal from "../../../ui/components/Modal";
import useAuth from "../../../hooks/auth/useAuth";
import useGetUserPlaylists from "../../Users/hooks/useGetUserPlaylists";
import { useInView } from "react-intersection-observer";
import Spinner from "../../../ui/components/Spinner";
import useCreateParty from "../hooks/useCreateParty";
import { useQueryClient } from "@tanstack/react-query";

function DropDownButton({ onClick }) {
  return <IoMdArrowDropdown onClick={onClick} />;
}

export default function CreatePartyForm() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [contribPlaylistId, setContribPlaylistId] = useState("");
  const [contribPlaylistName, setContribPlaylistName] = useState("");
  const [error, setError] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    const acceptedFile = acceptedFiles[0];
    acceptedFile.preview = URL.createObjectURL(acceptedFile);
    setFile(acceptedFile);
    console.log(acceptedFile);
  });

  const queryClient = useQueryClient();

  const { auth } = useAuth();

  const {
    userPlaylists,
    isError,
    isPending,
    isSuccess,
    error: playlistsError,
    fetchNextPage,
    hasNextPage,
  } = useGetUserPlaylists({ id: auth.id });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const { mutate: create, isPending: isCreating } = useCreateParty();

  function handleSelectPlaylist(playlist) {
    setContribPlaylistId(playlist._id);
    setContribPlaylistName(playlist.name);
    setDropDownOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name) {
      setError("Enter name of the album");
      return;
    }
    if (!contribPlaylistId) {
      setError("Select a playlist");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("coverArt", file);
    formData.append("name", name);
    formData.append("contribPlaylistId", contribPlaylistId);

    create(formData, {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(["authUserParty"]);
      },
      onError: (err) => {
        console.log(err);
        setError(err.message);
      },
    });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="flex flex-col gap-6 justify-start h-full items-center bg-slate-600 p-5 px-8 rounded-lg overflow-scroll">
      <h1 className="text-3xl font-bold">Create Party</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form>
        <input
          className="w-60 h-10 md:w-80 md:h-10 bg-primary rounded-lg outline-none focus:shadow-lg p-1"
          type="text"
          placeholder="Party Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      <div className="flex justify-start items-center gap-3">
        <span>{contribPlaylistName || "Select Playlist"}</span>
        <Modal
          ToggleElement={DropDownButton}
          isOpen={dropDownOpen}
          setOpen={setDropDownOpen}
        >
          <div className="w-72 h-96 flex flex-col ">
            {isError && <div>{playlistsError}</div>}
            {isPending && <Spinner />}
            {isSuccess &&
              userPlaylists.pages.map((page) =>
                page.data.map((playlist) => (
                  <div
                    key={playlist._id}
                    onClick={() => {
                      handleSelectPlaylist(playlist);
                    }}
                    className="h-14 w-full bg-secondary rounded-lg flex shrink-0 grow-0 justify-start items-center gap-3"
                  >
                    <img
                      className="h-10 grow-0"
                      src={
                        playlist?.like
                          ? "/LikedPlaylist.jpg"
                          : playlist?.files?.coverArt
                          ? playlist?.files?.coverArt
                          : "/Playlist.jpg"
                      }
                      alt="cover art"
                    />
                    <div className="w-32 h-12 grow-0 flex justify-start items-center hover:underline">
                      {playlist.name.length > 20
                        ? `${playlist.name.slice(0, 19)}...`
                        : playlist.name}
                    </div>
                  </div>
                ))
              )}
            <div ref={ref}>{hasNextPage && <Spinner />}</div>
          </div>
        </Modal>
      </div>

      <div
        className="h-32 w-60 bg-secondary flex rounded-lg justify-center items-center p-2"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className=" md:hidden text-blue-200">
          {isDragActive
            ? "Drop Here"
            : file?.preview
            ? "click to select a different file"
            : "Cover Art: Click to select File"}
        </div>
        <div className="hidden md:flex text-blue-200">
          {isDragActive
            ? "Drop Here"
            : file?.preview
            ? "Click or drop to select a different file"
            : "Cover Art: Drag and Drop here. Or Click to select File"}
        </div>
      </div>

      <div className="h-60 w-60 bg-secondary flex rounded-lg p-2">
        {file?.preview ? (
          <img className="h-full w-full" src={file.preview} />
        ) : (
          <span className="text-gray-500">Preview...</span>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isCreating}
        className="h-16 w-32 bg-secondary rounded-lg p-3"
      >
        Create Party
      </button>
    </div>
  );
}
