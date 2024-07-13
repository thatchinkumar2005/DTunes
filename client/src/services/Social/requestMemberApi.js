import { data } from "autoprefixer";

export default function partyRequestApi(axiosPrivate) {
  return async (id) => {
    try {
      const resp = await axiosPrivate({
        method: "POST",
        url: `party/request/`,
        data: {
          userId: id,
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };
}
