import React from "react";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import promoteToArtist from "../../../services/users/authUser/promoteToArtist";

export default function usePromoteArtist() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: promote, isPending: isPromoting } = useMutation({
    mutationFn: promoteToArtist(axiosPrivate),
  });
  return { promote, isPromoting };
}
