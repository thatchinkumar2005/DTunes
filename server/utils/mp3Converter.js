import ffmpeg from "fluent-ffmpeg";
import { PassThrough } from "stream";

export default async function mp3Converter({ buffer }) {
  console.log("utils");
  return new Promise((resolve, reject) => {
    const inpStream = new PassThrough();
    const outputStream = new PassThrough();
    const chunks = [];
    try {
      inpStream.end(buffer);

      outputStream.on("data", (chunk) => chunks.push(chunk));
      outputStream.on("end", () => resolve(Buffer.concat(chunks)));
      outputStream.on("error", (err) => reject(err));

      ffmpeg(inpStream)
        .toFormat("mp3")
        .on("error", (err) => {
          reject(err);
        })
        .pipe(outputStream);
    } catch (error) {
      reject(error);
    }
  });
}
