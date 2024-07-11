export default function createSongApi(axiosPrivate) {
  return async (data) => {
    try {
      const resp = await axiosPrivate({
        method: "POST",
        url: "/songs",
        data,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
