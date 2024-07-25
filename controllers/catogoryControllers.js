const fs = require("fs");
const Catagory = require("../models/Catagory");
const Movie = require("../models/Movie");

async function getCatagories(req, res) {
  const catagories = await Catagory.find({});
  res.render("index", {
    layout: "dashboard",
    page: "catagories",
    catagories,
  });
}

async function addCatagory(req, res) {
  const catagory = new Catagory(req.body);
  await catagory.save();
  req.flash("success", "Catagory added successfully");
  res.redirect("/catagories");
}

async function editCatagory(req, res) {
  await Catagory.findByIdAndUpdate(req.body.id, req.body);
  req.flash("info", "Catagory edited successfully");
  res.redirect("/catagories");
}

async function deleteCatagory(req, res) {
  await Catagory.findByIdAndDelete(req.params.id);

  movies = await Movie.find({ catagory: req.params.id });
  movies.forEach(({ image }) => fs.unlinkSync("./public/uploads/" + image));
  await Movie.deleteMany({ catagory: req.params.id });

  req.flash("danger", "Catagory deleted successfully");
  res.redirect("/catagories");
}

module.exports = { getCatagories, addCatagory, editCatagory, deleteCatagory };
