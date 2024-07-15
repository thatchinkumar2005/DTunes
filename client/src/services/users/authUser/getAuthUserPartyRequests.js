export default function getAuthUserPartyRequests(axiosPrivate) {
  return async ({ pageParam }) => {
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: `/users/authUser/partyRequests?page=${pageParam}&limit=500`,
      });
      const nextPageParam = resp.data.length === 0 ? null : pageParam + 1;

      return { data: resp.data, nextPageParam };
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
