const router = require("express").Router();
const {
  parties,
  entertainment,
  todos,
  shopping,
  users
} = require("../../data/helpers/dbHelpers.js");
const restrict = require("../../authentication/auth-middleware");

const genericError = { err: "There was a problem processing your request" };
//return object with all party information
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
//return array with list of todo records associated with party id passed in URL
router.get("/:id/todos", async (req, res) => {
  const { id } = req.params;
  try {
    const list = await todos.getList(id);
    if (list.length) {
      res.status(200).json(list);
    } else {
      res
        .status(404)
        .json({ err: "No todo lists associated with that party_id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error!" });
  }
});
//return array of entertainment records associated with party id passed in URL
router.get("/:id/entertainment", async (req, res) => {
  const { id } = req.params;
  try {
    const list = await entertainment.getList(id);
    if (list.length) {
      res.status(200).json(list);
    } else {
      res
        .status(404)
        .json({ err: "No entertainment lists associated with that party_id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error!" });
  }
});
//return array of shopping records associated with party id passed in URL
router.get("/:id/shopping", async (req, res) => {
  const { id } = req.params;
  try {
    const list = await shopping.getList(id);
    if (list.length) {
      res.status(200).json(list);
    } else {
      res
        .status(404)
        .json({ err: "No shopping lists associated with that party_id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error!" });
  }
});
//add new party
router.post("/", async (req, res) => {
  const party = req.body;
  try {
    if (party.user_id) {
      //checks if user_id is included
      const verifyUser = await users.getUser(party.user_id); //checks if user_id matches valid user
      if (verifyUser) {
        //adds party if valid user
        const newParty = await parties.add(party);
        res.status(201).json({ id: newParty[0] });
      } else {
        res.status(404).json({ err: "Specified user does not exist" });
      }
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
//edit party w/ matching id passed in URL, using object passed in request body
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const edit = req.body;
  try {
    const success = await parties.edit(id, edit);
    if (success) {
      const editedParty = await parties.get(success);
      res.status(200).json(editedParty);
    } else {
      res
        .status(400)
        .json({ err: "Couldn't update party with given information" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(genericError);
  }
});
//delete record w/ party id matching one passed in URL
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const removed = await parties.remove(id);
    if (removed) {
      res.status(202).json({ message: "Party removed" });
    } else {
      res.status(404).json({ err: "Party not found" });
    }
  } catch (err) {
    res.status(500).json(genericError);
  }
});

module.exports = router;
