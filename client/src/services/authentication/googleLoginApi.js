export default function googleLoginApi(axios) {
  return async (code) => {
    try {
      const resp = await axios({
        method: "GET",
        url: `/auth/oauth/google/token?${code}`,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
