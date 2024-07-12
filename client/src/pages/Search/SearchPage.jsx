import React from "react";
import SearchBar from "../../features/Search/SearchBar";

export default function SearchPage() {
  return (
    <div className="flex h-full w-full disable-scrollbars flex-col overflow-scroll p-3">
      <SearchBar />
    </div>
  );
}
