const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailRegex = /[@gmail.com|@yahoo.com|@hotmail.com|@live.com]$/;

  if (!emailRegex.test(email)) throw "Email is not supported from your domain.";
  if (password.length < 6) throw "password must be at least 6 characters long.";

  const user = new User({
    name,
    email,
    password: sha253(password + process.env.SALT),
  });

  await user.save();

  res.json({
    message: "User [" + name + "] registered Successfully!",
  });
};

exports.login = async (req, res) => {};
