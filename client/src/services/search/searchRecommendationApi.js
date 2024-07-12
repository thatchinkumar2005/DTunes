export default function searchRecommendationApi(axiosPrivate) {
  return async (data) => {
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: `/search/recommendation?query=${data}`,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
