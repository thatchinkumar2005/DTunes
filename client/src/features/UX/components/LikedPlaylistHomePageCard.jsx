import React from "react";
import { FaHeart } from "react-icons/fa";
import useGetAuthUserLikePlaylist from "../../Users/hooks/useGetAuthUserLikePlaylist";
import { useNavigate } from "react-router-dom";

export default function LikedPlaylistHomePageCard() {
  const { data, isSuccess } = useGetAuthUserLikePlaylist();
  const navigate = useNavigate();
  function handleClick(e) {
    console.log(data);
    e.preventDefault();
    if (isSuccess) {
      navigate(`/playlist/${data._id}`);
    }
  }
  return (
    <div
      onClick={handleClick}
      className="bg-secondary p-5  flex flex-row gap-5 justify-center items-center rounded-lg  hover:bg-gray-600"
    >
      <FaHeart className="h-7 w-7 fill-blue-500" />
      <span className="text-xl">Liked</span>
    </div>
  );
}
