export default function createPlaylistApi(axiosPrivate) {
  return async (data) => {
    try {
      const resp = await axiosPrivate({
        method: "POST",
        url: "/playlists",
        data,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
