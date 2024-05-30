const database = require("../config/database");
const { Schema } = require("mongoose");

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  rating: Number,
  catagory: String,
});

const Movie = database.model("Movie", movieSchema);

module.exports = Movie;
