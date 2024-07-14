import { useQuery } from "@tanstack/react-query";
import getArtistPlays from "../../../services/users/authUser/getArtistPlays";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
export default function useGetArtistPlays({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["userPlays", id],
    queryFn: getArtistPlays(axiosPrivate),
    enabled: !!id,
  });
  return { data, isPending, isSuccess };
}
