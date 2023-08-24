const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  money: {
    type: Number,
    default: 10000,
  },
});

module.exports = mongoose.model("User", userSchema);
