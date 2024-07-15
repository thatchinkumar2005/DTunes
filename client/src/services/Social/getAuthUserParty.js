export default function getAuthUserPartyApi(axiosPrivate) {
  return async () => {
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: "/users/authUser/party",
      });

      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
