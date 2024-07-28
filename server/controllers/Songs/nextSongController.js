import { User } from "../../models/User.js";
import getRecommendation from "../../utils/getRecommendation.js";

export default async function nextSongController(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findOne({ _id: user.id });

    // userDoc.queue.currentIndex =
    //   userDoc.queue.currentIndex === userDoc.queue.currentSongs.length - 1
    //     ? 0
    //     : userDoc.queue.currentIndex + 1;

    if (userDoc.queue.currentIndex === userDoc.queue.currentSongs.length - 1) {
      const resp = await getRecommendation({
        userId: user.id,
        page: 1,
        limit: 20,
      });

      const result = JSON.parse(resp);

      const songs = result.map((res) => {
        return res.song;
      });

      userDoc.queue.currentIndex = 0;
      userDoc.queue.currentSongs = songs;
      userDoc.queue.clusterName = "Recommended";
      userDoc.queue.clusterId = "/";
    } else {
      userDoc.queue.currentIndex++;
    }
    userDoc.queue.currentSong =
      userDoc.queue.currentSongs[userDoc.queue.currentIndex];
    await userDoc.save();
    return res.json(userDoc.queue.currentSong);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
