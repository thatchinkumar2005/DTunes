export default function (axiosPrivate) {
  return async ({ queryKey }) => {
    const [_, songId, playlistId] = queryKey;
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: `/playlists/checkSong/${playlistId}`,
        data: {
          songId,
        },
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
