export default function deleteSongApi(axiosPrivate) {
  return async (id) => {
    try {
      const resp = await axiosPrivate({
        method: "DELETE",
        url: `/songs/${id}`,
      });

      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
