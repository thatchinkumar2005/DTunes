import { User } from "../../../models/User.js";

export default async function getAuthUserController(req, res) {
  try {
    const user = req.user;
    const result = await User.findOne(
      { _id: user.id },
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
      }
    );

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
