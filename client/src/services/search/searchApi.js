export default function searchApi(axiosPrivate) {
  return async ({ query, type, record = true }) => {
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: `/search?query=${query}&type=${type}${
          record ? "&record=record" : ""
        }`,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
