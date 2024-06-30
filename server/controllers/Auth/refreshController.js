import jwt from "jsonwebtoken";
import { User } from "../../models/User.js";
import { settings } from "../../config/settings.js";

export default async function refreshController(req, res) {
  try {
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;
    if (!refreshToken)
      return res.status(401).json({ message: "no cookie found" });

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      return res.status(401).json({ message: "no matching user found" });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username)
          return res.status(401).json({ message: "invalid refresh token" });

        const accessToken = jwt.sign(
          {
            username: foundUser.username,
            roles: foundUser.roles,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: settings.accessTokenExpiry,
          }
        );

        return res.json({ accessToken, username: foundUser.username });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
