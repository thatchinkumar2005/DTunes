export default function getPlaylistApi(axiosPrivate) {
  return async ({ queryKey }) => {
    try {
      const [_, id] = queryKey;
      const resp = await axiosPrivate({
        method: "GET",
        url: `/playlists/${id}`,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
