const router = require("express").Router();

const { entertainment } = require("../../data/helpers/dbHelpers.js");

router.post("/", async (req, res) => {
  const newItem = req.body;
  if (newItem.party_id && newItem.item) {
    try {
      const success = await entertainment.add(newItem);
      if (success) {
        res.status(201).json({ id: success[0] });
      } else {
        res.status(400).json({ err: "Couldn't add item" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: "Error!" });
    }
  } else {
    res
      .status(400)
      .json({ err: "Please include a party_id and item in request body" });
  }
});

router.post("/", async (req, res) => {
  const newItem = req.body;
  if (newItem.party_id && newItem.item) {
    try {
      const verifyParty = await parties.get(newItem.party_id);
      if (verifyParty) {
        const success = await entertainment.add(newItem);
        if (success) {
          res.status(201).json({ id: success[0] });
        } else {
          res.status(400).json({ err: "Couldn't add item" });
        }
      } else {
        res.status(404).json({ err: "Party does not exist" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: "Error!" });
    }
  } else {
    res
      .status(400)
      .json({ err: "Please include a party_id and item in request body" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await entertainment.delete(id);
    if (deleted) {
      res.status(204).json({ message: "Entry deleted" });
    } else {
      res.status(400).json({ err: "Couldn't delete message" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error!" });
  }
});

module.exports = router;
