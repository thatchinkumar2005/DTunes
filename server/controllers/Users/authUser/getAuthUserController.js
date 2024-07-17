import dotenv from "dotenv";
dotenv.config();
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { User } from "../../../models/User.js";
import { s3 } from "../../../config/bucketConn.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function getAuthUserController(req, res) {
  try {
    const user = req.user;
    const result = await User.findOne(
      { _id: user.id },
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
    );

    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `ProfilePic/${result.id}.png`,
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });

    result.files.profilePic = url;

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
