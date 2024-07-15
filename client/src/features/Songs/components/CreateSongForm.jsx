import React, { useCallback, useRef, useState } from "react";
import useCreateSong from "../hooks/useCreateSong";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateSongForm({ albumId }) {
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [lyric, setLyric] = useState("");
  const [genre, setGenre] = useState("");
  const form = useRef();

  const { createSong, isCreatingSong } = useCreateSong();
  const queryClient = useQueryClient();
  const onDrop = useCallback((acceptedFiles) => {
    const acceptedFile = acceptedFiles[0];
    acceptedFile.preview = URL.createObjectURL(acceptedFile);
    setImage(acceptedFile);
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!image) {
      setError("Select Image File");
      form.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    if (!audio) {
      setError("Select Audio File");
      form.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    if (!name) {
      setError("Enter song name");
      form.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    if (name.length > 16) {
      setError("Name can't be more than 16 characters");
      return;
    }
    if (!genre) {
      setError("Enter Genre");
      form.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("genre", JSON.stringify(genre.split(",")));
    formData.append("albumId", albumId);
    formData.append("lyric", lyric);
    formData.append("file", audio);
    formData.append("coverArt", image);
    createSong(formData, {
      onSuccess: (data) => {
        toast("New Song Uploaded!");
        queryClient.invalidateQueries(["userSongs"]);
        queryClient.invalidateQueries(["recommendedSongs"]);
        navigate(`/profile`);
      },
      onError: (err) => {
        setError(err.message);
      },
    });
  }

  return (
    <div
      ref={form}
      className="flex flex-col h-full gap-6 justify-start items-center bg-slate-600 p-6 rounded-lg overflow-scroll disable-scrollbars"
    >
      <h1 className="text-3xl font-bold shrink-0">New Song</h1>
      {!!error && <dir className="text-red-500">{error}</dir>}
      <input
        type="text"
        placeholder="Song Name"
        className="w-60 h-10 md:w-80 md:h-10 bg-primary rounded-lg outline-none focus:shadow-lg p-1 shrink-0"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div
        className="flex flex-row gap-3 bg-primary w-60 h-32 md:w-80  rounded-lg justify-center items-center p-1 shrink-0"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className=" md:hidden text-blue-200">
          {isDragActive
            ? "Drop Here"
            : image?.preview
            ? "click to select a different file"
            : "Cover Art: Click to select File"}
        </div>
        <div className="hidden md:flex text-blue-200">
          {isDragActive
            ? "Drop Here"
            : image?.preview
            ? "Click or drop to select a different file"
            : "Cover Art: Drag and Drop here. Or Click to select File"}
        </div>
      </div>
      <div className="h-40 w-40 bg-primary shrink-0 flex justify-center items-center p-2">
        {image?.preview ? (
          <img className="h-full w-full" src={image.preview} />
        ) : (
          <span>Preview...</span>
        )}
      </div>
      <div className="flex flex-col gap-2 shrink-0">
        <h2>Song File:</h2>
        <input
          className="outline-none bg-primary rounded-lg w-60 md:w-80"
          type="file"
          placeholder="Image File"
          onChange={(e) => {
            setAudio(e.target.files[0]);
          }}
        />
      </div>

      <textarea
        className="h-32 w-60 md:w-80 outline-none rounded-lg bg-secondary p-2 resize-none disable-scrollbars shrink-0"
        placeholder="Lyrics"
        value={lyric}
        onChange={(e) => {
          setLyric(e.target.value);
        }}
      ></textarea>
      <input
        type="text"
        placeholder="Genres"
        className="w-60 h-10 md:w-80 md:h-10 bg-primary rounded-lg outline-none focus:shadow-lg p-1 shrink-0"
        value={genre}
        onChange={(e) => {
          setGenre(e.target.value);
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={isCreatingSong}
        className="p-2 bg-secondary rounded-lg hover:scale-105 duration-150 shrink-0"
      >
        Create Song
      </button>
    </div>
  );
}
