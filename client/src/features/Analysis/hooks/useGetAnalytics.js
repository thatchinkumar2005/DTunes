import useAxiosPrivate from "../../../hooks/axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import getAnalytics from "../../../services/Analytics/getAnalytics";
export default function useGetAnalytics() {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: analysis,
    isPending: isGettingAnalysis,
    isSuccess: gotAnalysis,
  } = useQuery({
    queryKey: ["authUserAnalytics"],
    queryFn: getAnalytics(axiosPrivate),
  });

  return { analysis, isGettingAnalysis, gotAnalysis };
}
