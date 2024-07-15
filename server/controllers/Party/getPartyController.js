import { Party } from "../../models/Party.js";

export default async function getPartyController(req, res) {
  try {
    const { id } = req.params;
    const party = await Party.findOne({ _id: id });
    return res.json(party);
  } catch (error) {
    return res.json({ message: error.message });
  }
}
