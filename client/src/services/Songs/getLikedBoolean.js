export default function getLikedBoolean(axiosPrivate) {
  return async function ({ queryKey }) {
    const [_, song] = queryKey;
    try {
      const resp = await axiosPrivate({
        url: `/users/authUser/checkLike/${song}`,
      });
      console.log(resp);
      return resp.data.liked;
    } catch (error) {
      console.log(error);
    }
  };
}
