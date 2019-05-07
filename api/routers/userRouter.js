const router = require("express").Router();
const private = require("../../middleware/auth-middleware");

const { users, parties } = require("../../data/helpers/dbHelpers.js");
const genericError = { err: "There was a problem processing your request" };

router.get("/:id", private, async (req, res) => {
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

router.get("/:id/parties", private, async (req, res) => {
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
