import { Interaction } from "../../models/InteractionData";

export default async function getPlaysController(req, res) {
  try {
    const { id } = req.params;
    const plays = await Interaction.aggregate()
      .match({
        intType: "play",
        song: id,
      })
      .group({
        _id: "$song",
        plays: { $sum: "$count" },
      });

    return res.json({ plays: plays.plays });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
