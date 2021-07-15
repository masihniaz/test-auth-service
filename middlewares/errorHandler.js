const chalk = require("chalk");
module.exports = (err, req, res, next) => {
  // in a perfect world, you would log the errors in a centeralized error monitoring service
  console.error(chalk.red(err.message));
  res.status(500).json({
    error: err.message,
  });
};
