import { data } from "autoprefixer";

export default function getArtistAlbums(axiosPrivate) {
  return async ({ pageParam, queryKey }) => {
    try {
      const [_, id] = queryKey;
      const resp = await axiosPrivate({
        method: "GET",
        url: `/users/albums/${id}?page=${pageParam}`,
      });
      const nextPageParam = resp.data.length === 0 ? null : pageParam + 1;
      return { data: resp.data, nextPageParam };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
