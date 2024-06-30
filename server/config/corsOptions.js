const allowedOrigins = [];

export const corsOpt = {
  origin: (origin, done) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      done(null, true);
    } else {
      done(new Error("Not Allowed By CORS"));
    }
  },
  credentials: true,
};
