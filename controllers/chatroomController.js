const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

exports.createChatroom = async (req, res) => {
  const { name } = req.body;
  // if(!name) throw " Name is required!"
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

  const chatroomExists = await Chatroom.findOne({ name }); //this a promise

  if (chatroomExists) throw " Chatroom with that name already exists";

  const chatroom = new Chatroom({
    name,
  });
  await chatroom.save();

  res.json({
    message: "Chatroom created!",
  });
};
