import { allowedOrigins } from "../../config/corsOptions.js";

export default function credentials(req, res, next) {
  try {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Credentials", true);
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
