import multer from "multer";

const storage = multer.memoryStorage();
export const albumUpload = multer({ storage }).single("coverArt");
