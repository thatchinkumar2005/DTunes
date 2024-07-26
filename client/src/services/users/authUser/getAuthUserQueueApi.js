export default function getAuthUserQueue(axiosPrivate) {
  return async () => {
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: "/users/authUser/queue",
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
}
