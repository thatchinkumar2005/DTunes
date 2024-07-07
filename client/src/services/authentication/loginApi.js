export default function loginApi(axios) {
  return async (data) => {
    const resp = await axios({
      method: "POST",
      url: "/auth/login",
      data,
    });
  };
}
