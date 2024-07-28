import dotenv from "dotenv";
dotenv.config();
import { GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Party } from "../../models/Party.js";
import { s3 } from "../../config/bucketConn.js";

export default async function getPartyController(req, res) {
  try {
    const { id } = req.params;
    const party = await Party.findOne({ _id: id });
    try {
      const exists = await s3.send(
        new HeadObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `CoverArt/${party.id}.png`,
        })
      );
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `CoverArt/${party.id}.png`,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });

      party.file.coverArt = url;
    } catch (error) {}
    return res.json(party);
  } catch (error) {
    return res.json({ message: error.message });
  }
}
