export default function nextSongApi(axiosPrivate) {
  return async () => {
    try {
      const resp = await axiosPrivate({
        method: "POST",
        url: "/users/authUser/queue/next",
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
