export default function registerApi(axios) {
  return async (data) => {
    try {
      const resp = await axios({
        method: "POST",
        url: "/auth/register",
        data,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
