import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import searchApi from "../../../services/search/searchApi";

export default function useSearch() {
  const axiosPrivate = useAxiosPrivate();
  const {
    mutate: search,
    isPending: isSearching,
    isSuccess: searched,
  } = useMutation({
    mutationFn: searchApi(axiosPrivate),
  });

  return { search, isSearching, searched };
}
