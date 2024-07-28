import dotenv from "dotenv";
dotenv.config();
import { User } from "../../models/User.js";
import { GetObjectCommand, HeadObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/bucketConn.js";

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
        party: 1,
        currentPlaying: 1,
      }
    )
      .skip((page - 1) * limit)
      .limit(limit);

    for (const artist of artists) {
      try {
        const exists = await s3.send(
          new HeadObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: `ProfilePic/${artist.id}.png`,
          })
        );
        const command = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `ProfilePic/${artist.id}.png`,
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });

        artist.files.profilePic = url;
      } catch (error) {}
    }

    return res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
