import { Friend } from "../../../models/Friend.js";

export default async function getAuthUserFriendsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;
    const user = req.user;

    const friends = await Friend.find({ friend: user.id, status: "accepted" })
      .skip((page - 1) * limit)
      .limit(limit);

    const result = friends.map((lst) =>
      lst.friend.find((i) => !i.equals(user.id))
    );

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
