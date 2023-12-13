const multer = require("multer");
const { failed } = require("../Helper/common");

// File management
const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"]);
    const maxSize = 2 * 1024 * 1024;
    if (fileSize > maxSize) {
      const error = {
        message: "File size exceeds 2 MB",
      };
      return cb(error, false);
    }
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      const error = {
        message: "file must be jpeg,jpg or png",
      };
      cb(error, false);
    }
  },
});

// Middleware
const upload = (req, res, next) => {
  const multerSingle = multerUpload.single("photo_profile");
  multerSingle(req, res, (err) => {
    if (err) {
      failed(res, {
        code: 500,
        status: "error",
        message: err.message,
        error: [],
      });
    } else {
      // console.log(req.file);
      next();
    }
  });
};

module.exports = upload;
