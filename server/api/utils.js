const {promisifiedVerify} = require("../db/users")


// Gets token from header and sets to req.token. Sends Forbidden(403) message if auth header is undefined.
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    req.token = bearerToken;

    req.id = await promisifiedVerify(bearerToken);

    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = {
  verifyToken,
};