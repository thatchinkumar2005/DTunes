export default function getArtistsApi(axiosPrivate) {
  return async ({ pageParam }) => {
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: `/users/artists?page=${pageParam}`,
      });
      const nextPageParam = resp.data.length === 0 ? null : pageParam + 1;
      console.log(resp.data);
      return { data: resp.data, nextPageParam };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
