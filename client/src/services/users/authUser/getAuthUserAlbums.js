export default function getAuthUserAlbums(axiosPrivate) {
  return async () => {
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: "/users/authUser/albums",
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
