import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import getAuthUserFrndReln from "../../../services/users/authUser/getAuthUserFrndReln";

export default function useGetAuthUserFrndReln({ id }) {
  const axiosPrivate = useAxiosPrivate();
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["authUserFrndReln", id],
    queryFn: getAuthUserFrndReln(axiosPrivate),
  });

  return { data, isFetching, isSuccess };
}
