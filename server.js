require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection Error: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected!");
});
const app = require("./app");

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
