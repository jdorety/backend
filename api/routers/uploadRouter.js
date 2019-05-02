const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Datauri = require("datauri");

const moodBoard = require("../../data/helpers/mood_board/moodBoard.js");

let dUri = new Datauri();

// const dataUri = req =>
//   dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

const memStorage = multer.memoryStorage();

const upload = multer({ storage: memStorage });

router.post("/:partyId", upload.single("photo"), async function(
  req,
  res,
  next
) {
  const { partyId } = req.params;
  try {
  if (req.file) {
    const jpgUp = dUri.format(".jpg", req.file.buffer);
    cloudinary.uploader.upload(jpgUp.content, async function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).json({ err: "Could not upload image" });
      } else {
        console.log(result);
        const added = await moodBoard.add(partyId, result.url);
        res.status(201).json(added)
      }
    });
  } else {
    res.status(400).json({err: "please include an image to upload"})
  }
} catch (err) {
    res.status(500).json({err: "There was a problem processing your request"})
  }
});

module.exports = router;
