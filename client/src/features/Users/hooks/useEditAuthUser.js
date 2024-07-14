import React from "react";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import editAuthUser from "../../../services/users/authUser/editAuthUser";

export default function useEditAuthUser() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate, isPending } = useMutation({
    mutationFn: editAuthUser(axiosPrivate),
  });
  return { mutate, isPending };
}
