export default function getAnalytics(axiosPrivate) {
  return async () => {
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: "/users/authUser/analysis",
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
