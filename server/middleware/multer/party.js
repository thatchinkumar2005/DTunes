import multer from "multer";

const storage = multer.memoryStorage();
export const partyUpload = multer({ storage }).single("coverArt");
