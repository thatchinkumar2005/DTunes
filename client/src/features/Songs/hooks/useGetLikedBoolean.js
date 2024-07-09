import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getLikedBoolean from "../../../services/Songs/getLikedBoolean";

export default function useGetLikedBoolean({ song }) {
  const axiosPrivate = useAxiosPrivate();
  const { data: isLiked, isFetching: isGetting } = useQuery({
    queryKey: ["isLiked", song],
    queryFn: getLikedBoolean(axiosPrivate),
    gcTime: 0,
  });

  return { isLiked, isGetting };
}
