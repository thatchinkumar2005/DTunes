export default function getLikedBoolean(axiosPrivate) {
  return async function ({ queryKey }) {
    const [_, song] = queryKey;
    try {
      const resp = await axiosPrivate({
        url: `/users/authUser/checkLike/${song}`,
      });

      return resp.data.liked;
    } catch (error) {}
  };
}
