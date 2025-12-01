const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Access Denied: No Token" });

    try {
      console.log("Token Received:", token);
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    console.log("Decoded Token:", decoded);
    req.email = decoded.email;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};
