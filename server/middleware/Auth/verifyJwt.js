import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
export default async function verifyJwt(req, res, next) {
  try {
    const authorizationHeader =
      req?.headers?.Authorization || req?.headers?.authorization;
    if (!authorizationHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Bearer Token missing" });
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Access Token missing" });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(409).json({ message: "invalid Access Token" });
      }
      req.user = decoded;

      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
