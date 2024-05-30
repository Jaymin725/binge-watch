const express = require("express");
const catagoryRouter = express.Router();

const Catagory = require("../models/Catagory");

const {
  getCatagories,
  addCatagory,
  editCatagory,
  deleteCatagory,
} = require("../controllers/catogoryControllers");

catagoryRouter.route("/").get(getCatagories);

catagoryRouter
  .route("/add")
  .get((req, res) =>
    res.render("index", {
      layout: "dashboard",
      page: "add-catagory",
    })
  )
  .post(addCatagory);

catagoryRouter.post("/edit", editCatagory);

catagoryRouter.get("/edit/:id", async (req, res) => {
  const catagory = await Catagory.findById(req.params.id);
  catagory.id = req.params.id;

  res.render("index", {
    layout: "dashboard",
    page: "edit-catagory",
    catagory,
  });
});

catagoryRouter.route("/delete/:id").get(deleteCatagory);

module.exports = catagoryRouter;
