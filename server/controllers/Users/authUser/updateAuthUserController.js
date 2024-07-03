import { unlink, access } from "fs/promises";
import { User } from "../../../models/User.js";

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import sharp from "sharp";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function updateAuthUserController(req, res) {
  try {
    const user = req.user;

    const { fname, lname, bio } = req.body;
    const file = req.file;

    const resUser = await User.findOne({ _id: user.id });
    resUser.fname = fname || resUser.fname;
    resUser.lname = lname || resUser.lname;
    resUser.bio = bio || resUser.bio;

    const profilePicPath = join(
      __dirname,
      "../../../STORAGE/ProfilePic",
      `${resUser.id}.png`
    );
    if (file) {
      try {
        await access(profilePicPath);
        await unlink(profilePicPath);
      } catch (error) {
        if (error.code === "ENOENT") {
          console.log("file missing");
        } else {
          throw error;
        }
      }

      await sharp(file.buffer)
        .resize(512, 512)
        .toFormat("png")
        .toFile(profilePicPath);

      if (!resUser.files.profilePic) {
        resUser.files.profilePic = `http://localhost:7777/serverStorage/ProfilePic/${resUser.id}.png`;
      }
    }

    await resUser.save();
    return res.json(resUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
