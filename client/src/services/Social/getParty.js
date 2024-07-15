export default function getParty(axiosPrivate) {
  return async ({ queryKey }) => {
    const [_, id] = queryKey;
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: `/party/${id}`,
      });

      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
