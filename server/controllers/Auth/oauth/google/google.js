import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import jwt from "jsonwebtoken";
import { Strategy } from "passport-google-oauth20";
import { User } from "../../../../models/User.js";
import { settings } from "../../../../config/settings.js";
import { jwtTokenCookieOpt } from "../../../../config/jwtTokenCookieOpt.js";

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: "http://localhost:5173/auth/oauth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const foundUser = await User.findOne({
        "oauth.oauthCode": profile.id,
      });
      if (!foundUser) {
        const user = await User.create({
          fname: profile.name.givenName,
          lname: profile.name.familyName,
          username: `${profile.name.givenName.split(" ")[0]}${profile.id}`,
          email: profile.emails[0].value,
          oauth: {
            oauthProvider: "google",
            oauthCode: profile.id,
          },
          roles: {
            user: 2005,
          },
        });
        console.log("register oauth");
        done(null, user);
      } else {
        console.log("login oauth");
        done(null, foundUser);
      }
    }
  )
);
export async function googleOauthTokenExchanger(req, res, next) {
  passport.authenticate(
    "google",
    { session: false },
    async (err, user, info) => {
      if (err) return res.status(500).json({ message: err.message });
      if (!user) return res.status(401).json({ message: "Oauth failed" });

      const roles = Object.values(user.roles).filter(Boolean);
      const accessToken = jwt.sign(
        { username: user.username, id: user._id, roles },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: settings.accessTokenExpiry }
      );
      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: settings.refreshTokenExpiry,
        }
      );

      user.refreshToken = refreshToken;
      await user.save();
      res.cookie("jwt", refreshToken, jwtTokenCookieOpt);
      return res.json({
        accessToken,
        username: user.username,
        id: user._id,
        roles,
      });
    }
  )(req, res, next);
}

export { passport };
