import ffmpeg from "fluent-ffmpeg";
import { PassThrough } from "stream";

export default async function mp3Converter({ buffer, path }) {
  return new Promise((resolve, reject) => {
    const inpStream = new PassThrough();
    // const buffer = Buffer.from(bufferArr);
    inpStream.end(buffer);

    ffmpeg(inpStream)
      .toFormat("mp3")
      .audioCodec("libmp3lame")
      .on("end", () => {
        resolve(path);
      })
      .on("error", (err) => {
        reject(err);
      })
      .save(path);
  });
}
