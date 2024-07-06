import dotenv from "dotenv";
dotenv.config();
export default async function dauthAuthoriseRedirect(req, res) {
  try {
    const params = new URLSearchParams();
    params.append("client_id", process.env.DAUTH_CLIENT_ID);
    params.append(
      "redirect_uri",
      "http://localhost:5173/auth/oauth/dauth/callback"
    );
    params.append("response_type", "code");
    params.append("grant_type", "authorization_code");
    params.append("state", "dtunes");
    params.append("scope", "user");
    params.append("nonce", "dtunes");

    const authUrl = `https://auth.delta.nitt.edu/authorize?${params.toString()}`;
    res.redirect(authUrl);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
