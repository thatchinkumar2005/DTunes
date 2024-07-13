export default function partyRespondApi(axiosPrivate) {
  return async ({ id, response, contribPlaylistId }) => {
    try {
      const resp = await axiosPrivate({
        method: "POST",
        url: `/party/respond/${id}`,
        data: { response, playlistId: contribPlaylistId },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
