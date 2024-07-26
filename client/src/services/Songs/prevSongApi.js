export default function prevSongApi(axiosPrivate) {
  return async () => {
    try {
      const resp = await axiosPrivate({
        method: "POST",
        url: "/users/authUser/queue/previous",
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
