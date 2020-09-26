const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./api/public/imgs");
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
module.exports.images = upload.single("avatar");
