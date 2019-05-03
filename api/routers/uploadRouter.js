const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Datauri = require("datauri");

const { moodBoard } = require("../../data/helpers/dbHelpers.js");

let dUri = new Datauri();

// const dataUri = req =>
//   dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

const memStorage = multer.memoryStorage();

const upload = multer({ storage: memStorage });

router.post("/:party_id", upload.single("photo"), async function(req, res) {
  const { party_id } = req.params;
  try {
    if (req.file) {
      const jpgUp = dUri.format(".jpg", req.file.buffer);
      cloudinary.uploader.upload(jpgUp.content, async function(err, result) {
        if (err) {
          console.log(err);
          res.status(400).json({ err: "Could not upload image" });
        } else {
          const { url, public_id } = result;
          const added = await moodBoard.add({
            url,
            party_id,
            public_id
          });
          res.status(201).json(added);
        }
      });
    } else {
      res.status(400).json({ err: "please include an image to upload" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err: "There was a problem processing your request" });
  }
});

module.exports = router;
