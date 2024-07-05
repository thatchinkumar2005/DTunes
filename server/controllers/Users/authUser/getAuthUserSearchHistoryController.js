import { SearchHistory } from "../../../models/SearchHistory.js";

export default async function getAuthUserSearchHistoryController(req, res) {
  try {
    const user = req.user;

    const history = await SearchHistory.find(
      { user: user.id },
      { query: 1, timeStamp: 1 }
    )
      .limit(10)
      .sort({ timeStamp: -1 });

    const results = history.map((h) => h.query);
    return res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
