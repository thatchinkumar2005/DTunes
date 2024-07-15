export default function getArtistPlays(axioPrivate) {
  return async ({ queryKey }) => {
    try {
      const [_, id] = queryKey;
      const resp = await axioPrivate({
        method: "GET",
        url: `/users/plays/${id}`,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
