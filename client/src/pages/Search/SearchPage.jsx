import React, { useEffect, useRef, useState } from "react";
import useSearchRecommendation from "../../features/Search/hooks/useSearchRecommendation";
import useGetAuthUserSearchHistory from "../../features/Users/hooks/useGetAuthUserSearchHistory";
import Spinner from "../../ui/components/Spinner";
import useSearch from "../../features/Search/hooks/useSearch";
import SongCard from "../../features/Songs/components/SongCard";
import AlbumCard from "../../features/Albums/components/AlbumCard";
import PlaylistCard from "../../features/Playlists/components/PlaylistCard";
import UserCard from "../../features/Users/components/UserCard";
import { useQueryClient } from "@tanstack/react-query";
import { RxHalf1 } from "react-icons/rx";

export default function SearchBar() {
  const inputRef = useRef();
  const searchBoxRef = useRef();
  const [query, setQuery] = useState("");
  const [recommedation, setRecommendation] = useState(null);
  const [results, setResults] = useState(null);
  const [focus, setFocus] = useState(false);
  const [all, setAll] = useState(true);

  const { mutate: getRecommendataion, isPending: isGettingRecommendataion } =
    useSearchRecommendation();

  const queryClient = useQueryClient();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef?.current &&
        !inputRef.current.contains(event.target) &&
        searchBoxRef?.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    data: searchHistory,
    isFetching: isGettingSearchHistory,
    isSuccess: isFetchedSearchHistory,
  } = useGetAuthUserSearchHistory();

  const { search, isSearching } = useSearch();

  function handleChange(e) {
    setQuery(e.target.value);
    setRecommendation([]);
    getRecommendataion(query, {
      onSuccess: (data) => {
        setRecommendation(data);
      },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    search(
      { query, type: all ? "all" : "user" },
      {
        onSuccess: (respData) => {
          setResults(respData);
          setFocus(false);
        },
      }
    );
  }

  return (
    <div className="p-2 h-full w-full flex flex-col disable-scrollbars overflow-scroll">
      <div className="relative flex flex-col mb-10">
        <div className="flex gap-2">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={`Search ${all ? "All" : "Users"}`}
              className="h-8 w-56 bg-primary rounded-lg p-2 outline-none"
              value={query}
              onChange={handleChange}
              ref={inputRef}
              onFocus={() => {
                setFocus(true);
                setRecommendation([]);
                queryClient.invalidateQueries(["authUserSearchHistory"]);
              }}
            />
          </form>

          <div className="flex gap-6 items-center ml-10">
            <span
              onClick={() => {
                setAll(true);
                setRecommendation([]);
                setResults([]);
              }}
              className={`px-3 py-1 rounded-lg border-solid border-2 border-primary ${
                all ? "bg-secondary" : "bg-transparent"
              } cursor-pointer`}
            >
              All
            </span>
            <span
              onClick={() => {
                setAll(false);
                setRecommendation([]);
                setResults([]);
              }}
              className={`px-3 py-1 rounded-lg border-solid border-2 border-primary ${
                !all ? "bg-secondary" : "bg-transparent"
              } cursor-pointer`}
            >
              Users
            </span>
          </div>
        </div>
        {focus && (
          <div
            className={`max-h-32 overflow-scroll disable-scrollbars w-56 rounded-lg bg-secondary absolute top-10 `}
            ref={searchBoxRef}
          >
            {!!query && (
              <div className="flex flex-col gap-1 p-2 items-start justify-start">
                <div
                  className=" hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    search(
                      { query, type: all ? "all" : "user" },
                      {
                        onSuccess: (respData) => {
                          setResults(respData);
                          setFocus(false);
                        },
                      }
                    );
                  }}
                >
                  {query}
                </div>
                {recommedation.map((r, i) => (
                  <div
                    className=" hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      setQuery(r._id);
                      search(
                        { query: r._id, type: all ? "all" : "user" },
                        {
                          onSuccess: (respData) => {
                            setResults(respData);
                            setFocus(false);
                          },
                        }
                      );
                    }}
                    key={i}
                  >
                    {r._id}
                  </div>
                ))}
              </div>
            )}
            {!query && (
              <div className="flex flex-col gap-1 p-2 items-start justify-start">
                {isGettingSearchHistory && <Spinner />}
                {isFetchedSearchHistory &&
                  searchHistory.map((h, i) => (
                    <div
                      className=" hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        setQuery(h);
                        search(
                          { query: h, type: all ? "all" : "user" },
                          {
                            onSuccess: (respData) => {
                              setResults(respData);
                              setFocus(false);
                            },
                          }
                        );
                      }}
                      key={i}
                    >
                      {h}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
      {all && results && (
        <div className="flex flex-col gap-10">
          {!!results?.songs?.length && (
            <div className="px-6 grow-0 shrink-0">
              <h2>Songs</h2>
              <div className="h-48 w-full bg-primary rounded-lg p-3 flex flex-col gap-3 overflow-scroll disable-scrollbars">
                {results?.songs.map((song) => (
                  <SongCard key={song._id} song={song} />
                ))}
              </div>
            </div>
          )}
          {!!results?.albums?.length && (
            <div className="px-6 grow-0 shrink-0">
              <h2>Albums</h2>
              <div className="h-48 w-full bg-primary rounded-lg p-3 flex flex-col gap-3 overflow-scroll disable-scrollbars">
                {results?.albums.map((album) => (
                  <div
                    key={album._id}
                    className="flex justify-center items-center"
                  >
                    <AlbumCard album={album} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!results?.playlists?.length && (
            <div className="px-6 grow-0 shrink-0">
              <h2>Playlists</h2>
              <div className="h-48 w-full bg-primary rounded-lg p-3 flex flex-col gap-3 overflow-scroll disable-scrollbars">
                {results?.playlists.map((playlist) => (
                  <div
                    key={playlist._id}
                    className="flex justify-center items-center"
                  >
                    <PlaylistCard playlist={playlist} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!results?.artists?.length && (
            <div className="px-6 grow-0 shrink-0">
              <h2>Artists</h2>
              <div className="h-32 md:h-40 w-full bg-primary rounded-lg p-3 disable-scrollbars grid grid-cols-3 md:grid-cols-4 gap-y-2 overflow-scroll">
                {results?.artists.map((artist) => (
                  <div
                    key={artist._id}
                    className="flex justify-center items-center"
                  >
                    <UserCard user={artist} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!all && results && (
        <div>
          {results?.users?.length && (
            <div className="px-6 grow-0 shrink-0">
              <h2>Users</h2>
              <div className="h-32 md:h-40 w-full bg-primary rounded-lg p-3 disable-scrollbars grid grid-cols-3 md:grid-cols-4 gap-y-2 overflow-scroll">
                {results.users.map((user) => (
                  <div
                    key={user._id}
                    className="flex justify-center items-center"
                  >
                    <UserCard user={user} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!results && (
        <div className="grow flex justify-center ">
          <h1 className="text-3xl text-bold text-primary mt-20">
            Search Something
          </h1>
        </div>
      )}
    </div>
  );
}
