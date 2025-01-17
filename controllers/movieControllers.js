const Movie = require("../models/Movie");

const fs = require("fs");

async function getMovies(req, res) {
  const movies = await Movie.find({}).populate("catagory");
  res.render("index", { layout: "dashboard", page: "movies", movies });
}

async function addMovie(req, res) {
  let movie = new Movie(req.body);
  movie.image = req.file.filename;
  await movie.save();
  req.flash("success", "Movie added successfully");
  res.redirect("/movies");
}

async function editMovie(req, res) {
  let movie = req.body;

  if (req.file) {
    fs.unlinkSync("./public/uploads/" + req.body.old_image);
    movie.image = req.file.filename;
  } else {
    movie.image = req.body.old_image;
  }

  await Movie.findByIdAndUpdate(req.body.id, req.body);
  req.flash("info", "Movie edited successfully");
  res.redirect("/movies");
}

async function deleteMovie(req, res) {
  const movie = await Movie.findById(req.params.id);
  fs.unlinkSync("./public/uploads/" + movie.image);

  await Movie.findByIdAndDelete(req.params.id);
  req.flash("danger", "Movie deleted successfully");
  res.redirect("/movies");
}

module.exports = { getMovies, addMovie, editMovie, deleteMovie };
