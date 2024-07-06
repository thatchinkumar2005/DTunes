import { Interaction } from "../../models/InteractionData.js";
import { Like } from "../../models/Like.js";
import { Song } from "../../models/Song.js";
import getRecommendation from "../../utils/getRecommendation.js";

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

    const result = await getRecommendation({
      userId: userIdStr,
      page,
      limit,
    });

    return res.json(JSON.parse(result));

    // return res.json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
