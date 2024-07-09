export default function likeApi(axiosPrivate) {
  return async (_id) => {
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: `/songs/like/${_id}`,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };
}
