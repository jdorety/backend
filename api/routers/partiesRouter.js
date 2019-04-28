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

router.post("/", async (req, res) => {
  const party = req.body;
  try {
    if (party.user_id) {
      const newParty = await parties.add(party);
      res.status(201).json(newParty[0]);
    } else {
      res
        .status(400)
        .json({ err: "Please provide a valid user id for the party" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: genericError });
  }
});

module.exports = router;
