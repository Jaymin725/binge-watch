const express = require("express");
const app = express();

const port = 3000;

const movieRouter = require("./routes/movieRoute");
const catagoryRouter = require("./routes/catagoryRoute");

// const Catagory = require("./models/Catagory");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

app.use("/movies", movieRouter);
app.use("/catagories", catagoryRouter);

app.get("/", (req, res) => res.redirect("/movies"));

app.listen(port, (error) => {
  if (error) throw error;
  else console.log("Server listening on http://localhost:" + port);
});
