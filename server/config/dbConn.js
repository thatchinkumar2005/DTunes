import mongoose from "mongoose";
export default async function dbConn() {
  await mongoose.connect(process.env.DATABASE_URL);
}
