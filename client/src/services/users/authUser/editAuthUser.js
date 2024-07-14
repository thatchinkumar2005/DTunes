export default function editAuthUser(axiosPrivate) {
  return async (data) => {
    try {
      const resp = await axiosPrivate({
        method: "PUT",
        url: "/users/authUser",
        data,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
