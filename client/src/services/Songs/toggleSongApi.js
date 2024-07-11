export default function toggleSongApi(axiosPrivate) {
  return async ({ songId, playlistId }) => {
    try {
      const resp = await axiosPrivate({
        method: "POST",
        url: `/songs/toggleToPlaylist/${songId}`,
        data: { playlistId },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
