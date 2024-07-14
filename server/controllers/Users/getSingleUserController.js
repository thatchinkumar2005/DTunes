import { User } from "../../models/User.js";

export default async function getSingleUserController(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });

    const resUser = await User.findById(id);
    if (!resUser) return res.status(400).json({ message: "No such user" });

    const result = await User.findOne(
      { _id: resUser._id },
      {
        fname: 1,
        lname: 1,
        username: 1,
        email: 1,
        roles: 1,
        verified: 1,
        genres: 1,
        files: 1,
        bio: 1,
        party: 1,
        currentPlaying: 1,
      }
    );

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
