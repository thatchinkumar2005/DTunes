export default function searchApi(axiosPrivate) {
  return async ({ query, type }) => {
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: `/search?query=${query}&type=${type}`,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
