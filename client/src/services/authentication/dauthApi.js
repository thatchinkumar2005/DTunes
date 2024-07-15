export default function dauthApi(axiosPrivate) {
  return async (code) => {
    try {
      const resp = await axiosPrivate({
        method: "GET",
        url: `/auth/oauth/dauth/token?${code}`,
      });

      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
