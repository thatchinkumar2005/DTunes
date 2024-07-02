import multer from "multer";

const storage = multer.memoryStorage();
export const playlistUpload = multer({ storage }).single("coverArt");
