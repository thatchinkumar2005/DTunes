import React from "react";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import getAuthUserPartyPlaylist from "../../../services/users/authUser/getAuthUserPartyPlaylist";

export default function useGetAuthUserPartyPlaylist() {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: authUserPartyPlaylist,
    isFetching: isGettingAuthUserPartyPlaylist,
    isSuccess: gotAuthUserPartyPlaylist,
  } = useQuery({
    queryKey: ["authUserPartyPlaylist"],
    queryFn: getAuthUserPartyPlaylist(axiosPrivate),
  });

  return {
    authUserPartyPlaylist,
    isGettingAuthUserPartyPlaylist,
    gotAuthUserPartyPlaylist,
  };
}
