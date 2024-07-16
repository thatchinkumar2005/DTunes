import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Album } from "../../models/Album.js";
import { s3 } from "../../config/bucketConn.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function getSingleAlbum(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });

    const album = await Album.findById(id);

    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `CoverArt/${album.id}.png`,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
    album.files.coverArt = url;

    return res.json(album);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
