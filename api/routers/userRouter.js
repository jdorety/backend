const router = require("express").Router();

const { users, parties } = require("../../data/helpers/dbHelpers.js");
const genericError = { err: "There was a problem processing your request" };

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await users.getUser(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ err: "User not found" });
    }
  } catch {
    res.status(500).json(genericError);
  }
});

router.get("/:id/parties", async (req, res) => {
  try {
    const userId = req.params.id;
    const partyList = await parties.getList(userId);
    if (partyList) {
      res.status(200).json(partyList);
    } else {
      res.status(404).json({ err: "No parties associated with user" });
    }
  } catch {
    res.status(500).json(genericError);
  }
});


module.exports = router;
