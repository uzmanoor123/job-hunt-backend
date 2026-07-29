const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
    
    if (!token) {
      return res.status(401).json({
        error: "token is required",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth middleware error:", error.message);
    return res.status(401).json({
      error: "invalid or expire token",
    });
  }
};
module.exports = authMiddleware;
