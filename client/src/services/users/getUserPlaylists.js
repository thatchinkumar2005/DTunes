export default function getUserPlaylists(axiosPrivate) {
  return async ({ pageParam, queryKey }) => {
    try {
      const [_, id] = queryKey;
      const resp = await axiosPrivate({
        method: "GET",
        url: `/users/playlists/${id}?page=${pageParam}`,
      });
      const nextPageParam = resp.data.length === 0 ? null : pageParam + 1;
      return { data: resp.data, nextPageParam };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
