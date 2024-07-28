import { User } from "../../../models/User.js";

export default async function getAuthUserQueueController(req, res) {
  try {
    const user = req.user;
    const result = await User.findOne(
      { _id: user.id },
      {
        queue: 1,
      }
    );

    return res.json(result.queue);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
