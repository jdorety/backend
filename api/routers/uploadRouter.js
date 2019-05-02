const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Datauri = require("datauri");

let dUri = new Datauri();

// const dataUri = req =>
//   dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

const memStorage = multer.memoryStorage();

const upload = multer({ storage: memStorage });

router.post("/:id", upload.single("photo"), function(req, res, next) {
  if (req.file) {
    console.log("req.file: ", req.file);
    const jpgUp = dUri.format(".jpg", req.file.buffer);
    cloudinary.uploader.upload(jpgUp.content, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  }
});

module.exports = router;
