const router = require("express").Router();

const { todos, parties } = require("../../data/helpers/dbHelpers.js");

router.post("/", async (req, res) => {
  const newItem = req.body;
  if (newItem.party_id && newItem.item) {
    try {
      const verifyParty = await parties.get(newItem.party_id);
      if (verifyParty) {
        const success = await todos.add(newItem);
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

router.put("/:id", async (req, res) => {
  const editItem = req.body;
  const { id } = req.params;
  try {
    if (editItem.item || editItem.completed) {
      const edited = await todos.update(id, editItem);
      if (edited) {
        res.status(201).json(edited);
      } else {
        res.status(400).json({ err: "Couldn't edit specified entry" });
      }
    } else {
      res.status(400).json({ err: "Please include valid entry" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error!" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await todos.delete(id);
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
