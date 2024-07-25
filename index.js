const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const app = express();

const port = 3000;

const movieRouter = require("./routes/movieRoute");
const catagoryRouter = require("./routes/catagoryRoute");
const authRouter = require("./routes/authRoute");

// const Catagory = require("./models/Catagory");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.use(
  session({
    secret: "hello world",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(require("flash")());

app.use("/", authRouter);
app.use("/", (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
});
app.use("/movies", movieRouter);
app.use("/catagories", catagoryRouter);

app.get("/", (req, res) => res.redirect("/login"));

app.listen(port, (error) => {
  if (error) throw error;
  else console.log("Server listening on http://localhost:" + port);
});
