import { spawn } from "child_process";

import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function getRecommendation({ userId, page, limit }) {
  return new Promise((resolve, reject) => {
    const pyProcess = spawn("python3", [
      join(__dirname, "../python/songsRecommendation/getRecommendation.py"),
      userId,
      page,
      limit,
    ]);

    let stdoutData = "";
    let stderrData = "";

    pyProcess.stdout.on("data", (data) => (stdoutData += data.toString()));
    pyProcess.stderr.on("data", (data) => (stderrData += data.toString()));

    pyProcess.on("close", (code) => {
      if (code !== 0) {
        reject(new Error("exited with code " + code.toString()));
      } else {
        resolve(stdoutData);
      }
    });
  });
}
