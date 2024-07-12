export default function friendRespondApi(axiosPrivate) {
  return async ({ id, response }) => {
    try {
      const resp = await axiosPrivate({
        method: "POST",
        url: `/friend/respondRequest/${id}`,
        data: { response },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
