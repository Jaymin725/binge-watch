const database = require("../config/database");
const { Schema } = require("mongoose");

const catagorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Catagory = database.model("Catagory", catagorySchema);

module.exports = Catagory;
