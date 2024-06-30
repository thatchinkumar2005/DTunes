import { User } from "../../models/User.js";
import bcrypt from "bcrypt";

export default async function registerController(req, res) {
  try {
    const { username, fname, lname, email, pswd, roles } = req.body;
    const duplicateUser = await User.findOne({ username }).exec();
    if (duplicateUser)
      return res.status(409).json({ message: "User already exits" });
    const hash = await bcrypt.hash(pswd, 10);
    const newUser = await User.create({
      username,
      fname,
      lname: lname || "",
      email,
      hash,
      roles,
    });
    return res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
