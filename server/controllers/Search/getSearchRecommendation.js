import { SearchHistory } from "../../models/SearchHistory.js";

export default async function getSearchRecommendation(req, res) {
  try {
    const q = req.query.query;
    const resp = await SearchHistory.aggregate()
      .match({ query: { $regex: q, $options: "i" } })
      .group({
        _id: "$query",
        count: { $sum: "$queryCount" },
      })
      .sort({ count: -1 });
    res.json(resp);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
