import mongoose from "mongoose";
import { User } from "../../models/User.js";

export default async function getAllArtistsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const user = req.user;
    const artists = await User.find(
      {
        "roles.artist": { $exists: true },
        _id: { $ne: user.id },
      },
      {
        fname: 1,
        lname: 1,
        username: 1,
        email: 1,
        roles: 1,
        verified: 1,
        genres: 1,
        files: 1,
        bio: 1,
      }
    )
      .skip((page - 1) * limit)
      .limit(limit);
    console.log(artists);

    return res.json(artists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
