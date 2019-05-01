const router = require("express").Router();

const { shopping, parties } = require("../../data/helpers/dbHelpers.js");

router.post("/", async (req, res) => {
  const newItem = req.body;
  if (newItem.party_id && newItem.item) {
    try {
      const verifyParty = await parties.get(newItem.party_id);
      if (verifyParty) {
        const success = await shopping.add(newItem);
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
    if (editItem.item || editItem.purchased || editItem.cost) {
      //edit shopping list item record in DB
      const edited = await shopping.update(id, editItem);
      //if edit is succesful...
      if (edited) {
        //get the party_id of the edited item
        const { party_id } = await shopping.getById(id);
        console.log(party_id);
        //get array of all costs associated with that party_id
        const newBudget = await shopping.getBudget(party_id);
        console.log(newBudget);
        if (newBudget) {
          //if there are any costs, they are added up
          const total = newBudget.reduce((acc, curr) => (acc += curr));
          //edits the party record with the updated budget
          await parties.edit(party_id, { spentBudget: total });
        }
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
    const deleted = await shopping.delete(id);
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
