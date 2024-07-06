import dotenv from "dotenv";
dotenv.config();
import { jwtTokenCookieOpt } from "../../config/jwtTokenCookieOpt.js";
import { User } from "../../models/User.js";

export default async function logoutController(req, res) {
  //clear accessToken in client
  try {
    const cookie = req.cookies;
    const refreshToken = cookie.jwt;
    if (!refreshToken) return res.status(204).end();

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", jwtTokenCookieOpt);
      return res.status(204).end();
    }

    foundUser.currentPlaying = null;
    foundUser.refreshToken = "";
    await foundUser.save();
    res.clearCookie("jwt", jwtTokenCookieOpt);

    if (foundUser.oauth.oauthProvider !== "none") {
      req.logout(() => {
        console.log("Oauth Logout");
      });
    }
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
