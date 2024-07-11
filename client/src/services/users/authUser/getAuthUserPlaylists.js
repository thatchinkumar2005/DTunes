export default function getAuthUserPlaylistsApi(axiosPrivate) {
  return async () => {
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: "/users/authUser/playlists",
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
