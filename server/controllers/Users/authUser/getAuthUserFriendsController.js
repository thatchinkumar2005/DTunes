import { Friend } from "../../../models/Friend.js";

export default async function getAuthUserFriendsController(req, res) {
  try {
    const user = req.user;

    const friends = await Friend.find({ friend: user.id, status: "accepted" });

    const result = friends.map((lst) =>
      lst.friend.find((i) => !i.equals(user.id))
    );

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
