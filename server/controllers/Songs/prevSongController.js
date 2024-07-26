import { User } from "../../models/User.js";

export default async function prevSongController(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findOne({ _id: user.id });

    userDoc.queue.currentIndex =
      userDoc.queue.currentIndex === 0
        ? userDoc.queue.currentSongs.length - 1
        : userDoc.queue.currentIndex - 1;
    userDoc.queue.currentSong =
      userDoc.queue.currentSongs[userDoc.queue.currentIndex];
    await userDoc.save();
    return res.json(userDoc.queue.currentSong);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
