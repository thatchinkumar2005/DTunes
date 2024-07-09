export default function getRecommendationsApi(axiosPrivate) {
  return async ({ pageParam }) => {
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: `/recommend?page=${pageParam}`,
      });
      const nextPageParam = resp.data.length === 0 ? null : pageParam + 1;
      console.log(resp.data);
      return { data: resp.data, nextPageParam };
    } catch (error) {
      console.log(error);
    }
  };
}
