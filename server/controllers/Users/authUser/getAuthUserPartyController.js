import dotenv from "dotenv";
dotenv.config();
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Party } from "../../../models/Party.js";
import { User } from "../../../models/User.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../../config/bucketConn.js";

export default async function getAuthUserPartyController(req, res) {
  try {
    const user = req.user;

    const resUser = await User.findOne({ _id: user.id });
    if (!resUser.party) return res.json(null);

    const party = await Party.findOne({ _id: resUser.party.id });

    if (party) {
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `CoverArt/${party?.id}.png`,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
      party.file.coverArt = url;
    }

    return res.json(party);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
