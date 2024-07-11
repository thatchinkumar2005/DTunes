import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function AlbumCreateForm() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    const acceptedFile = acceptedFiles[0];
    acceptedFile.preview = URL.createObjectURL(acceptedFile);
    setFile(acceptedFile);
    console.log(acceptedFile);
  });

  function handleSubmit() {}

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <form onSubmit={handleSubmit}>
        <input
          className="w-60 h-10 bg-primary rounded-lg outline-none focus:shadow-lg p-1"
          type="text"
          placeholder="Album Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>

      <div
        className="h-32 w-60 bg-secondary flex rounded-lg justify-center items-center p-2"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className=" md:hidden">
          {isDragActive
            ? "Drop Here"
            : file?.preview
            ? "click to select a different file"
            : "Cover Art: Click to select File"}
        </div>
        <div className="hidden md:flex">
          {isDragActive
            ? "Drop Here"
            : file?.preview
            ? "click or drop to select a different file"
            : "Cover Art: Drag and Drop here. Or Click to select File"}
        </div>
      </div>

      <div className="h-60 w-60 bg-secondary flex">
        {file?.preview ? (
          <img src={file.preview} />
        ) : (
          <span className="text-gray-500">Preview...</span>
        )}
      </div>
      <button className="h-16 w-32 bg-secondary rounded-lg p-3">
        Create Album
      </button>
    </div>
  );
}
