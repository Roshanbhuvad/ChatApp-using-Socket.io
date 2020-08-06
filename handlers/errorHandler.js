// Catch Errors handler

exports.catchErrors = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => {
      // Validation errors
      if (typeof err === "string") {
        res.status(400).json({
          message: err,
        });
      } else {
        next(err);
      }
    });
  };
};

/* MongoDB validation Error handler, Detect if there are mongodb validation errors that we
them nicely back */

exports.mongooseErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);
  const errorKeys = Object.keys(err.errors);
  let message = "";
  errorKeys.forEach((key) => ((message += err.errors[key]), message + " ,"));

  message = message.substr(0, message.length - 2);
  res.status(400).json({ message });
};

/* Development Error handler. In development we show good error messages 
so if we hit a syntax error or any other previous un-handled error, We can show good info on what happened */

exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stack: err.stack,
  };

  res.status(err.status || 500).json(errorDetails); // Send JSON back
};

/* Production Error handler. No stacktraces and error details are leaked to user */

exports.productionError = (err, req, res, next) => {
  res.status(err.status || 500).json({ error: "Internal server Error" }); // send JSON back
};

// 404 page error
exports.notFound = (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
};
