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

router.post("/:party_id", upload.single("photo"), async (req, res) => {
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

router.get("/:party_id", async (req, res) => {
  const { party_id } = req.params;
  try {
    const mBoard = await moodBoard.getList(party_id);
    if (mBoard.length) {
      res.status(200).json(mBoard);
    } else {
      res
        .status(404)
        .json({ message: "No mood board associated with that party_id" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err: "There was a problem processing your request" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const image = await moodBoard.getById(id);
    if (image) {
      cloudinary.uploader.destroy(image.public_id, async (error, result) => {
        console.log(error, result);
        // if (result == { result: "ok" }) {
        //   const deleted = await moodBoard.remove(id);
        //   if (deleted) {
        //     res.status(200).json({ message: "Image deleted" });
        //   } else {
        //     res.status(404).json({ err: "Image not found in database" });
        //   }
        // } else {
        //   res.status(404).json({ err: "Image does not exist" });
        // }
        try {
          const deleted = await moodBoard.remove(id);
          if (deleted) {
            res.status(200).json({ message: "Image deleted" });
          } else {
            res.status(404).json({ err: "Image not found" });
          }
        } catch {
          res.status(500).json({ err: "Couldn't delete item" });
        }
      });
    } else {
      res.status(404).json({ err: "No image at that id" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err: "There was a problem processing that request" });
  }
});

module.exports = router;
