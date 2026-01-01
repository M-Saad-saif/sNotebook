const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;  // Fix the typo here

const fetchuser = (req, res, next) => {
  // Getting token from header
  const token = req.header("auth-token");
  
  console.log("🔍 BACKEND DEBUG - Token received:", token ? token.substring(0, 20) + "..." : "None");
  console.log("🔍 BACKEND DEBUG - JWT_SECRET exists:", !!JWT_SECRET);
  
  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }
  
  try {
    // Verify token
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    console.log("✅ BACKEND DEBUG - Token verified for user:", data.user.id);
    next();
  } catch (error) {
    console.error("❌ BACKEND DEBUG - Token verification error:", error.message);
    console.error("❌ BACKEND DEBUG - Full error:", error);
    return res.status(401).json({ 
      error: "Please authenticate using a valid token",
      details: error.message 
    });
  }
};

module.exports = fetchuser;