export default function createAlbumApi(axiosPrivate) {
  return async (data) => {
    try {
      const resp = await axiosPrivate({
        method: "POST",
        url: `/albums`,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
