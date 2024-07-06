import axios from "axios";
export default async function dauth(req, res) {
  try {
    const authCode = req.query.code;

    const params = new URLSearchParams();
    params.append("client_secret", process.env.DAUTH_CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", authCode);
    params.append("client_id", process.env.DAUTH_CLIENT_ID);
    params.append(
      "redirect_uri",
      "http://localhost:5173/auth/oauth/dauth/callback"
    );

    const { DauthAccessToken } = await axios({
      method: "POST",
      url: `https://auth.delta.nitt.edu/api/oauth/token?${params.toString()}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(DauthAccessToken);

    const resp = await axios({
      method: "POST",
      url: `https://auth.delta.nitt.edu/api/resources/user`,
      headers: {
        Authorization: `Bearer ${DauthAccessToken}`,
      },
    });

    return res.json(resp);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
