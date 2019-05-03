const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ err: "1Please log in to continue" });
      } else {
        req.user_id = decodedToken.user_id;
        next();
      }
    });
  } else {
    res.status(401).json({ err: "Please log in to continue" });
  }
};
