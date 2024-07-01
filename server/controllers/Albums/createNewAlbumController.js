import { Album } from "../../models/Album.js";
import { User } from "../../models/User.js";

export default async function createNewAlbumController(req, res) {
  try {
    const user = req.user;
    console.log(user);
    const userMod = await User.findOne({ _id: user.id });
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "No name given to album" });
    const album = await Album.create({
      name,
      artist: user.id,
    });

    userMod.albums.push(album._id);
    await userMod.save();
    return res.json(album);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
