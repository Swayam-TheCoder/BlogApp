const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "sblog",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [
      { width: 800, height: 500, crop: "limit", quality: "auto" }
    ],
  },
  
});



const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;