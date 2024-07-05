import { User } from "../../models/User.js";

export default async function getAllUsersController(req, res) {
  try {
    const user = req.user;
    const queries = req.queries;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const users = await User.find(
      { _id: { $ne: user.id } },
      {
        fname: 1,
        lname: 1,
        username: 1,
        email: 1,
        roles: 1,
        verified: 1,
        genres: 1,
      }
    )
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
