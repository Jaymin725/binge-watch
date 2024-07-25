const express = require("express");
const movieRouter = express.Router();

const Movie = require("../models/Movie");
const Catagory = require("../models/Catagory");

const {
  getMovies,
  addMovie,
  editMovie,
  deleteMovie,
} = require("../controllers/movieControllers");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

movieRouter.route("/").get(getMovies);

movieRouter
  .route("/add")
  .get(async (req, res) => {
    const catagories = await Catagory.find({});

    res.render("index", {
      layout: "dashboard",
      page: "movie-add",
      catagories,
    });
  })
  .post(upload.single("image"), addMovie);

movieRouter.post("/edit", upload.single("image"), editMovie);

movieRouter.get("/edit/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate("catagory");
  movie.id = req.params.id;

  const catagories = await Catagory.find({});

  res.render("index", {
    layout: "dashboard",
    page: "movie-edit",
    movie,
    catagories,
  });
});

movieRouter.get("/view/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate("catagory");
  res.render("index", { layout: "dashboard", page: "movie-view", movie });
});

movieRouter.route("/delete/:id").get(deleteMovie);

module.exports = movieRouter;
