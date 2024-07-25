const mongoose = require("../config/mongoose");
const { Schema } = require("mongoose");

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  rating: Number,
  catagory: {
    type: Schema.Types.ObjectId,
    ref: "Catagory",
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
