export default function logoutApi(axios) {
  return async () => {
    try {
      const resp = await axios({
        method: "GET",
        url: "/auth/logout",
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
