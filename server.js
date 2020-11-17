const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
// app.use((req,res,next) =>{
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// });
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// create mongodb database - on cloud Amazon server(MongodB atlas)
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// check connection to data base
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Succesfully connected to Data base ");
});

// router to scores
const scoresRouter = require("./routes/scores");
//use routes from scores
app.use("/scores", scoresRouter);

/***********Configure front end********* */
// "heroku-postbuild" : "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
// if in production
if (process.env.NODE_ENV === "production") {
  //serve up static files
  app.use(express.static("client/build"));

  // connect index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// listen om port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is now running on port: ${port}`);
});
