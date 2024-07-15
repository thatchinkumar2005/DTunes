import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { User } from "../../../../models/User.js";
import jwt from "jsonwebtoken";
import { settings } from "../../../../config/settings.js";
import { jwtTokenCookieOpt } from "../../../../config/jwtTokenCookieOpt.js";
export default async function dauth(req, res) {
  try {
    const authCode = req.query.code;

    if (!authCode) return res.status(400).json({ message: "No auth code" });

    // x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append("client_id", process.env.DAUTH_CLIENT_ID);
    params.append("client_secret", process.env.DAUTH_CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", authCode);
    params.append(
      "redirect_uri",
      "http://localhost:5173/auth/oauth/dauth/callback"
    );

    const {
      data: { access_token },
    } = await axios({
      method: "POST",
      url: `https://auth.delta.nitt.edu/api/oauth/token`,
      data: params,
    });

    if (!access_token) return res.status(401).json({ message: "Ouath Failed" });

    const resp = await axios({
      method: "POST",
      url: `https://auth.delta.nitt.edu/api/resources/user`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = resp.data;
    if (!user) return res.status(401).json({ message: "Ouath Failed" });

    const foundUser = await User.findOne({
      "oauth.oauthCode": user.id,
      "oauth.oauthProvider": "dauth",
    });
    if (!foundUser) {
      const newUser = await User.create({
        username: `${user.name.split(" ")[0]}${user.id}`,
        fname: user.name,
        oauth: {
          oauthProvider: "dauth",
          oauthCode: user.id,
        },
        email: user.email,
        roles: {
          user: 2005,
        },
      });
      const roles = Object.values(newUser.roles).filter(Boolean);
      const accessToken = jwt.sign(
        {
          username: newUser.username,
          id: newUser._id,
          roles,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: settings.accessTokenExpiry }
      );

      const refreshToken = jwt.sign(
        {
          username: newUser.username,
          id: newUser._id,
          roles,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: settings.refreshTokenExpiry }
      );

      res.cookie("jwt", refreshToken, jwtTokenCookieOpt);

      console.log("dauth register");

      return res.json({
        accessToken,
        id: newUser._id,
        username: newUser.username,
        roles,
      });
    } else {
      const roles = Object.values(foundUser.roles).filter(Boolean);
      const accessToken = jwt.sign(
        {
          username: foundUser.username,
          id: foundUser._id,
          roles,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: settings.accessTokenExpiry }
      );

      const refreshToken = jwt.sign(
        {
          username: foundUser.username,
          id: foundUser._id,
          roles,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: settings.refreshTokenExpiry }
      );

      res.cookie("jwt", refreshToken, jwtTokenCookieOpt);

      console.log("dauth login");
      return res.json({
        accessToken,
        id: foundUser._id,
        username: foundUser.username,
        roles,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
