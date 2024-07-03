import multer from "multer";

const storage = multer.memoryStorage();

export const userUpload = multer({ storage }).single("profilePic");
