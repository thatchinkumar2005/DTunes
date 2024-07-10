export default function getArtistApi(axiosPrivate) {
  return async ({ queryKey }) => {
    const [_, id] = queryKey;
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: `/users/${id}`,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
