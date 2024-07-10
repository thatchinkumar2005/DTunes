export default function getSongApi(axiosPrivate) {
  return async ({ queryKey }) => {
    const [_, id] = queryKey;
    const resp = await axiosPrivate({
      method: "GET",
      url: `/songs/${id}`,
    });
    return resp.data;
  };
}
