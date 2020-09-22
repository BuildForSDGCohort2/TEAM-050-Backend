const jwt = require("jsonwebtoken");
const config = require("./../../config/default");

module.exports = function (req, res, next) {
    // Get token from header
    // const header = req.headers.authorization;
    const token = req.headers.authorization.split(' ').slice(1)[0]

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    jwt.verify(token, config.mySecrete, (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
