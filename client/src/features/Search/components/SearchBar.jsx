import React, { useRef, useState } from "react";
import useSearchRecommendation from "../hooks/useSearchRecommendation";
import useGetAuthUserSearchHistory from "../../Users/hooks/useGetAuthUserSearchHistory";
import Spinner from "../../../ui/components/Spinner";

export default function SearchBar() {
  const inputRef = useRef();
  const [query, setQuery] = useState("");
  const [recommedation, setRecommendation] = useState([]);
  const [focus, setFocus] = useState(false);
  const [all, setAll] = useState(true);
  const { mutate: getRecommendataion, isPending: isGettingRecommendataion } =
    useSearchRecommendation();

  const {
    data: searchHistory,
    isFetching: isGettingSearchHistory,
    isSuccess: isFetchedSearchHistory,
  } = useGetAuthUserSearchHistory();

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
    inputRef.current.blur();
    console.log(query);
  }

  return (
    <div className="relative flex flex-col">
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
            }}
            onBlur={() => {
              setFocus(false);
              setRecommendation([]);
            }}
          />
        </form>

        <div className="flex gap-6 items-center ml-10">
          <span
            onClick={() => {
              setAll(true);
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
        <div className="max-h-64 overflow-scroll w-56 rounded-lg bg-secondary absolute top-10">
          {!!query && (
            <div>
              <div className="flex p-2 items-start justify-start ">{query}</div>
              {recommedation.map((r, i) => (
                <div key={i} className="flex p-2 items-start justify-start ">
                  {r._id}
                </div>
              ))}
            </div>
          )}
          {!query && (
            <div className="flex p-2 items-start justify-start ">
              {isGettingSearchHistory && <Spinner />}
              {isFetchedSearchHistory &&
                searchHistory.map((h, i) => <div key={i}>{h}</div>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
