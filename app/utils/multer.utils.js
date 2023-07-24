const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");

function createRoute(req) {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "blogs",
    year,
    month,
    day
  );
  req.body.fileUploadPath = path.join("uploads", "blogs", year, month, day);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file?.originalname) {
      const filePath = createRoute(req);
      return cb(null, filePath);
    }
    cb(null, null);
  },
  filename: (req, file, cb) => {
    if (file.originalname) {
      const fileName = String(file.originalname);
      req.body.filename = fileName;
      return cb(null, fileName);
    }
    cb(null, null);
  },
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  const mimeTypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  if (mimeTypes.includes(ext)) {
    return cb(null, true);
  }
  return cb(createHttpError.BadRequest("فرمت ارسال شده تصویر صحیح نمی باشد"));
}

const pictureMaxSize = 5 * 1000 * 1000;
const uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: pictureMaxSize },
});

const sendFile = {
  uploadFile,
};

module.exports = sendFile;
