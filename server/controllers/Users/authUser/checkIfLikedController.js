import { Like } from "../../../models/Like.js";

export default async function checkIfLikedController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;

    const like = await Like.findOne({
      song: id,
      user: user.id,
    });

    return res.json({
      liked: like ? true : false,
      like,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
