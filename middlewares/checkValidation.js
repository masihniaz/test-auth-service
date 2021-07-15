const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // 422 Unprocessable Entity
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};
