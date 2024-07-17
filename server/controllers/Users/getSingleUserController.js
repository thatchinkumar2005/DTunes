import dotenv from "dotenv";
dotenv.config();
import { User } from "../../models/User.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/bucketConn.js";
import { GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

export default async function getSingleUserController(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });

    const resUser = await User.findById(id);
    if (!resUser) return res.status(400).json({ message: "No such user" });

    const result = await User.findOne(
      { _id: resUser._id },
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

    try {
      const exists = await s3.send(
        new HeadObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `ProfilePic/${result.id}.png`,
        })
      );
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `ProfilePic/${result.id}.png`,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });

      result.files.profilePic = url;
    } catch (error) {
      console.log("no file");
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
