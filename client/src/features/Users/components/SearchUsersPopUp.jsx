import React, { useState } from "react";
import useSearch from "../../Search/hooks/useSearch";
import usePartyRequest from "../../Social/hooks/useRequestParty";
import { FaRegUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SearchUsersPopUp({ setOpen }) {
  const { search, isSearching } = useSearch();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  function handleSearch(e) {
    e.preventDefault();
    search(
      { query, type: "user", record: false },
      {
        onSuccess: (data) => {
          setSearchResults(data.users);
        },
      }
    );
  }
  const { request, isRequesting } = usePartyRequest();
  function handleRequest(id) {
    request(id, {
      onSuccess: (data) => {
        setOpen(false);
        if (data?.status === "requested") {
          toast(data.status);
        } else {
          toast(data.message);
        }
      },
      onError: (err) => {
        toast(err.message);
      },
    });
  }

  function handleChange(e) {
    setQuery(e.target.value);
  }
  return (
    <div className="h-96 w-72 flex flex-col gap-2">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="h-10 w-full bg-primary rounded-lg outline-none p-1"
          placeholder="search users"
          value={query}
          onChange={handleChange}
          onFocus={() => {
            setSearchResults(null);
          }}
        />
      </form>
      <div className="w-full grow rounded-lg flex flex-col gap-2 bg-primary p-1">
        {searchResults &&
          searchResults.map((user) => (
            <div
              key={user._id}
              className="w-full h-12 rounded-lg bg-secondary p-2 flex gap-2 justify-start items-center"
              onClick={() => {
                handleRequest(user._id);
              }}
            >
              {" "}
              {user?.files?.profilePic ? (
                <img
                  className="h-8 rounded-full "
                  src={user?.files?.profilePic}
                />
              ) : (
                <FaRegUserCircle className="h-8 w-8 " />
              )}
              <div>{user.fname}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
