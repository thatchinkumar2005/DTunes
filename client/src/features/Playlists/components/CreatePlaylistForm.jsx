import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import useCreatePlaylist from "../hooks/useCreatePlaylist";
import toast from "react-hot-toast";

export default function CreatePlaylistForm() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [publicPlaylist, setPublic] = useState(false);
  const [error, setError] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    const acceptedFile = acceptedFiles[0];
    acceptedFile.preview = URL.createObjectURL(acceptedFile);
    setFile(acceptedFile);
    console.log(acceptedFile);
  });
  const { createPlaylist, isCreating } = useCreatePlaylist();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name) {
      setError("Enter name of the album");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("coverArt", file);
    formData.append("name", name);
    formData.append("type", publicPlaylist ? "public" : "private");

    createPlaylist(formData, {
      onSuccess: (data) => {
        console.log(data);
        toast("New playlist created");
        navigate("/");
      },
      onError: (err) => {
        console.log(err);
        setError(err.message);
      },
    });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="flex flex-col gap-6 justify-start h-full items-center bg-slate-600 p-5 px-8 rounded-lg">
      <h1 className="text-3xl font-bold">Create Playlist</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form>
        <input
          className="w-60 h-10 md:w-80 md:h-10 bg-primary rounded-lg outline-none focus:shadow-lg p-1"
          type="text"
          placeholder="Playlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>

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
      <div className="flex justify-start items-center gap-3">
        <span>Public Playlist: </span>
        <input
          type="checkbox"
          checked={publicPlaylist}
          onChange={(e) => {
            setPublic((state) => !state);
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isCreating}
        className="h-16 w-32 bg-secondary rounded-lg p-3"
      >
        Create Playlist
      </button>
    </div>
  );
}
