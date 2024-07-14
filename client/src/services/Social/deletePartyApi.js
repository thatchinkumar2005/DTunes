export default function deletePartyApi(axiosPrivate) {
  return async () => {
    try {
      const resp = await axiosPrivate({
        method: "DELETE",
        url: "/party",
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
