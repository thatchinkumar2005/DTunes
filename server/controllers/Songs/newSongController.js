import dotenv from "dotenv";
dotenv.config();
import { Song } from "../../models/Song.js";
import { Album } from "../../models/Album.js";
import { User } from "../../models/User.js";
import sharp from "sharp";
import mp3Converter from "../../utils/mp3Converter.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/bucketConn.js";

export default async function newSongController(req, res) {
  try {
    const user = req.user; //authenticated user

    const { name, artists, genre, albumId, highlight, lyric } = req.body; //body
    const genreLst = JSON.parse(genre); //genre list from string
    //bad requests
    if (!(name && albumId && genre))
      return res.status(400).json({ message: "Enter the mandatory fields" });
    const files = req.files;
    if (!files?.coverArt || !files?.file)
      return res.status(400).json({ message: "Select files" });

    //finding the album
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(400).json({ message: "No such album found" });
    }
    //checking for albums artist
    if (!album.artist._id.equals(user.id)) {
      return res.status(401).json({ message: "Not your album" });
    }
    //array of artists ids
    const artistsObjIds = [user.id]; //artists object id list
    if (artists) {
      const artistsLst = JSON.parse(artists); //list of string object ids
      for (let artistId of artistsLst) {
        const artist = await User.findOne({ id: artistId });
        if (!artist)
          return res.status(400).json({ message: "Artist not found" });
        artistsObjIds.push(artist._id);
      }
    }

    //creating a song in database
    const song = await Song.create({
      name,
      artists: artistsObjIds,
      album: album._id,
      genre: genreLst,
      highlight,
      lyric,
    });

    //sharp to resize and reformat
    const editedImage = await sharp(files.coverArt[0].buffer)
      .resize(1400, 1400)
      .toFormat("png")
      .toBuffer();

    const editedAudio = await mp3Converter({
      buffer: files.file[0].buffer,
    });

    console.log(editedAudio);

    const imageCommand = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `CoverArt/${song.id}.png`,
      Body: editedImage,
    });

    const audioCommand = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `Songs/${song.id}.mp3`,
      Body: editedAudio,
    });

    await s3.send(imageCommand);
    await s3.send(audioCommand);

    //responding with song doc
    return res.json(song);
  } catch (error) {
    //error handling
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
