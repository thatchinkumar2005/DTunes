import dotenv from "dotenv";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Interaction } from "../../models/InteractionData.js";
import { Like } from "../../models/Like.js";
import { Song } from "../../models/Song.js";
import getRecommendation from "../../utils/getRecommendation.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/bucketConn.js";

export default async function recommendSongsController(req, res) {
  try {
    const user = req.user;
    const userIdStr = user.id;

    const queries = req.query;
    const page = queries.page || 1;
    const limit = queries.limit || 10;

    // const mostPlays = await Interaction.aggregate()
    //   .match({ intType: "play" })
    //   .group({
    //     _id: "$song",
    //     plays: { $sum: "$count" },
    //   })
    //   .sort({ plays: -1 })
    //   .skip((page - 1) * limit)
    //   .limit(limit);

    // const mostLikes = await Like.aggregate()
    //   .group({
    //     _id: "$song",
    //     likes: { $sum: 1 },
    //   })
    //   .sort({ likes: -1 })
    //   .skip((page - 1) * limit)
    //   .limit(limit);

    // const resultIds = [...mostLikes, ...mostPlays];
    // const result = await Promise.all(
    //   resultIds.map(async (i) => {
    //     const song = await Song.findOne({ _id: i._id });
    //     console.log(song);
    //     return song;
    //   })
    // );
    // if (result.length < 2 * limit) {
    //   const fill = await Song.find()
    //     .sort({ releaseDate: -1 })
    //     .limit(2 * limit - result.length);

    //   return res.json([...result, ...fill]);
    // }
    // return res.json(result);
    const resp = await getRecommendation({
      userId: userIdStr,
      page,
      limit,
    });

    const result = JSON.parse(resp);
    console.log(result);

    const songs = await Promise.all(
      result.map(async (res) => {
        const song = await Song.findById(res.song);

        const imageCommand = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `CoverArt/${song.id}.png`,
        });
        const audioCommand = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `Songs/${song.id}.mp3`,
        });

        const imageUrl = await getSignedUrl(s3, imageCommand, {
          expiresIn: 3600 * 24,
        });
        const audioUrl = await getSignedUrl(s3, audioCommand, {
          expiresIn: 3600 * 24,
        });

        song.files.coverArt = imageUrl;
        song.files.audio = audioUrl;
        return song;
      })
    );

    return res.json(songs);

    // return res.json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
