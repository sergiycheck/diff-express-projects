const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const [name, token] = req.headers.authorization.split(" ");
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    const err = new Error("Auth failed");
    err.status = 401;
    next(err);
  }
};
