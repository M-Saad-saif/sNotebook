var jwt = require("jsonwebtoken");

const JWT_SECRET = "iamcaptainsaadsaif";

const fetchuser = (req, res, next) => {
  // gte the user from JWT token and id to req obj
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;

    next();
  } catch (error) {
    res.status(401).json({ error: "please authenticate using valid token" });
  }
};

module.exports = fetchuser;
