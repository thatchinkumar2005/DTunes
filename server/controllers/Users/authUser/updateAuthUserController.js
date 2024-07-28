import dotenv from "dotenv";
dotenv.config();
import { User } from "../../../models/User.js";

import sharp from "sharp";
import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { s3 } from "../../../config/bucketConn.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function updateAuthUserController(req, res) {
  try {
    const user = req.user;

    const { fname, lname, bio } = req.body;
    const file = req.file;

    const resUser = await User.findOne({ _id: user.id });
    resUser.fname = fname || resUser.fname;
    resUser.lname = lname || resUser.lname;
    resUser.bio = bio || resUser.bio;

    if (file) {
      const editedImage = await sharp(file.buffer)
        .resize(512, 512)
        .toFormat("png")
        .toBuffer();

      const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `ProfilePic/${resUser.id}.png`,
        Body: editedImage,
      });
      await s3.send(command);

      try {
        const exists = await s3.send(
          new HeadObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: `ProfilePic/${resUser.id}.png`,
          })
        );
        const command = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `ProfilePic/${resUser.id}.png`,
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });

        resUser.files.profilePic = url;
      } catch (error) {}
    }

    await resUser.save();

    return res.json(resUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
