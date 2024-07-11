import React, { useState } from "react";

export default function CreateSongForm() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center bg-slate-600 p-5 px-8 rounded-lg">
      <h1 className="text-3xl font-bold">New Song</h1>
      <input
        type="text"
        placeholder="Song Name"
        className="w-60 h-10 md:w-80 md:h-10 bg-primary rounded-lg outline-none focus:shadow-lg p-1"
      />
      <div className="flex flex-row gap-3 bg-primary w-32 h-10 rounded-lg"></div>
    </div>
  );
}
