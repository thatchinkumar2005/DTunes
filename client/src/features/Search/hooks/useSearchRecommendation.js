import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import searchRecommendationApi from "../../../services/search/searchRecommendationApi";

export default function useSearchRecommendation() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate, isPending } = useMutation({
    mutationFn: searchRecommendationApi(axiosPrivate),
  });

  return { mutate, isPending };
}
