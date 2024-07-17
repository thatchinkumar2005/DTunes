import dotenv from "dotenv";
dotenv.config();
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { User } from "../../models/User.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/bucketConn.js";

export default async function getAllUsersController(req, res) {
  try {
    const user = req.user;
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const users = await User.find(
      { _id: { $ne: user.id } },
      {
        fname: 1,
        lname: 1,
        username: 1,
        email: 1,
        roles: 1,
        verified: 1,
        genres: 1,
        bio: 1,
        party: 1,
        currentPlaying: 1,
      }
    )
      .skip((page - 1) * limit)
      .limit(limit);

    for (const user of users) {
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `ProfilePic/${user.id}.png`,
      });
      const url = await getSignedUrl(s3, command, {
        expiresIn: 3600 * 24,
      });

      artist.files.profilePic = url;
    }

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
