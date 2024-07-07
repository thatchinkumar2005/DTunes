export default function loginApi(axios) {
  return async (data) => {
    try {
      const resp = await axios({
        method: "POST",
        url: "auth/login",
        data,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
