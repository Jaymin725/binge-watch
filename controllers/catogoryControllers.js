const Catagory = require("../models/Catagory");

async function getCatagories(req, res) {
  const catagories = await Catagory.find({});
  // res.json(result);
  res.render("index", {
    layout: "dashboard",
    page: "catagories",
    catagories,
  });
}

async function addCatagory(req, res) {
  const catagory = new Catagory(req.body);
  console.log(catagory);

  await catagory.save();
  res.redirect("/catagories");
}

async function editCatagory(req, res) {
  await Catagory.findByIdAndUpdate(req.body.id, req.body);
  res.redirect("/catagories");
}

async function deleteCatagory(req, res) {
  await Catagory.findByIdAndDelete(req.params.id);
  res.redirect("/catagories");
}

module.exports = { getCatagories, addCatagory, editCatagory, deleteCatagory };
