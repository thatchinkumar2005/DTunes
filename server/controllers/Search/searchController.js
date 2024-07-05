import { Song } from "../../models/Song";

export default async function searchController(req, res) {
  try {
    const queries = req.queries;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;
    const query = queries?.query;
    const type = queries?.type;
    const offset = (page - 1) * limit;

    if (type === "all") {
      const nameBasedSongs = await Song.find({
        name: { $regex: query, $options: "i" },
      })
        .skip(offset)
        .limit(limit);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
