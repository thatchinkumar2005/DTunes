export const allowedOrigins = [
  "http://localhost:7777",
  "http://localhost:5173",
];

export const corsOpt = {
  origin: (origin, done) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      done(null, true);
    } else {
      done(new Error("Not Allowed By CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
