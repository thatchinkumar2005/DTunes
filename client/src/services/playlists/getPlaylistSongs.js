export default function getPlaylistSongs(axiosPrivate) {
  return async ({ pageParam, queryKey }) => {
    try {
      const [_, id] = queryKey;
      const resp = await axiosPrivate({
        method: "GET",
        url: `/playlists/songs/${id}?page=${pageParam} `,
      });
      console.log(resp);
      const nextPageParam = resp.data.length === 0 ? null : pageParam + 1;
      return { data: resp.data, nextPageParam };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
