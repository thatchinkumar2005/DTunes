export default function getParty(axiosPrivate) {
  return async ({ queryKey }) => {
    const [_, id] = queryKey;
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: `/party/${id}`,
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
