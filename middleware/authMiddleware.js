const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        error: "token is required",
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "invalid or expire token",
    });
  }
};
module.exports = authMiddleware;
