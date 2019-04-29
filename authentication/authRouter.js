const router = require("express").Router();

//register post receives object including username and password
router.post("/auth/register", async (req, res) => {
  const newUser = req.body;
  if (!newUser.username || !newUser.password) {
    res.status(400).json({ error: "Please provide username and password" });
  }
});

module.exports = router;
