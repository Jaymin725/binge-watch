const database = require("mongoose");

database
  .connect(
    "mongodb+srv://jaymin:mongo123@cluster0.vvuv1cl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to the database"))
  .catch(console.error);

module.exports = database;
