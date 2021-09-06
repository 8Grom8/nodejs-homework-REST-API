const path = require("path");
const multer = require("multer");
require("dotenv").config();

const UPLOAD_DIR = path.join(process.cwd(), "UPLOAD_DIR");

const storageSettings = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 10000,
  },
});

const uploadMiddleware = multer({
  storage: storageSettings,
});

module.exports = uploadMiddleware;