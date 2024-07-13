import React from "react";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useInfiniteQuery } from "@tanstack/react-query";
import getPartyMembers from "../../../services/Social/getPartyMembers";

export default function useGetPartyMembers({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: partyMembers,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["partyMembers", id],
    queryFn: getPartyMembers(axiosPrivate),
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: 1,
    enabled: !!id,
  });

  return {
    partyMembers,
    error,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  };
}
