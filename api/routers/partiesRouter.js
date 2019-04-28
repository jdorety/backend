const router = require("express").Router();
const {
  parties,
  entertainment,
  todos,
  shopping
} = require("../../data/helpers/dbHelpers.js");

const genericError = { err: "There was a problem processing your request" };

router.get("/:id", async (req, res) => {
  const partyId = req.params.id;
  try {
    const party = await parties.get(partyId);
    if (party) {
      //get entertainment list array
      const entList = await entertainment.getList(partyId);
      //get todo list array
      const tdList = await todos.getList(partyId);
      //get shopping list array
      const shopList = await shopping.getList(partyId);
      res.status(200).json({
        ...party,
        entertainment: entList,
        todos: tdList,
        shopping: shopList
      });
    } else res.status(404).json({ err: "Party not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json(genericError);
  }
});

module.exports = router;
