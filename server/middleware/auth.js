require("dotenv").config(); // Ensure we can read the .env file

const checkAuth = (req, res, next) => {
  // 1. Get the password from the request header
  const providedKey = req.headers["x-admin-key"];
  const secretKey = process.env.ADMIN_SECRET_KEY;

  // 2. Compare it with your .env password
  if (providedKey && providedKey === secretKey) {
    next(); // Match! Let the request pass
  } else {
    res.status(403).json({ message: "Access Denied: You are not an Admin" });
  }
};

module.exports = checkAuth;
