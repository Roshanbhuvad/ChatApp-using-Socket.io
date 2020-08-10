const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup cross-origin
app.use(require("cors")());

// Bring in the router
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));

//Setup Error Handlers
const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
