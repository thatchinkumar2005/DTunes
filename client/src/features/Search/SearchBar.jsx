import React, { useState } from "react";

export default function SearchBar() {
  const [focus, setFocus] = useState(false);
  const [all, setAll] = useState(true);
  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search All"
          className="h-8 w-56 bg-primary rounded-lg p-2 outline-none"
        />
        <div className="flex gap-6 items-center ml-10">
          <span
            onClick={() => {
              setAll(true);
            }}
            className={`px-3 py-1 rounded-lg border-solid border-2 border-primary ${
              all ? "bg-secondary" : "bg-transparent"
            }`}
          >
            All
          </span>
          <span
            onClick={() => {
              setAll(false);
            }}
            className={`px-3 py-1 rounded-lg border-solid border-2 border-primary ${
              !all ? "bg-secondary" : "bg-transparent"
            }`}
          >
            Users
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
}
