import { Interaction } from "../../models/InteractionData.js";
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

    const intData = await Interaction.findOne({
      song: userDoc.queue.currentSong,
      user: user.id,
      intType: "play",
    });

    if (!intData) {
      const newIntData = await Interaction.create({
        song: userDoc.queue.currentSong,
        user: user.id,
        intType: "play",
        count: 1,
      });
    } else {
      intData.count++;
      intData.timeStamp = Date.now();
      await intData.save();
    }

    return res.json(userDoc.queue.currentSong);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
