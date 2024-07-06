import { User } from "../../../models/User.js";

export default async function promoteToArtistController(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findOne({ _id: user.id });

    if (userDoc.roles.artist) {
      return res.status(400).json({ message: "Already an artist" });
    }

    userDoc.roles.artist = 2009;
    await userDoc.save();

    return res.json(userDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
