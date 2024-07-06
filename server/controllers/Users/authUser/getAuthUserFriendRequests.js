import { Friend } from "../../../models/Friend.js";

export default async function getAuthUserFriendRequests(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const user = req.user;

    const requests = await Friend.find({
      requestee: user.id,
      status: "requested",
    })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
