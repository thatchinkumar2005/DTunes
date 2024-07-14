export default function promoteToArtist(axiosPrivate) {
  return async () => {
    try {
      const resp = await axiosPrivate({
        method: "POST",
        url: "/users/authUser/promote",
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.status.message);
    }
  };
}
