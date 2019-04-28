const router = require("express").Router();

const { todos } = require("../../data/helpers/dbHelpers.js");

router.post("/", async (req, res) => {
  const newItem = req.body;
  if (newItem.party_id && newItem.item) {
    try {
      const success = await todos.add(newItem);
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

module.exports = router;
