const mongoose = require("../config/mongoose");
const { Schema } = require("mongoose");

const catagorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Catagory = mongoose.model("Catagory", catagorySchema);

module.exports = Catagory;
