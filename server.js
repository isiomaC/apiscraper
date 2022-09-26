require('dotenv').config();

const setEnv = require("./config");
setEnv()

const wrapRoutes = require('./routes')
const express = require("express");
const path = require("path");
const morgan = require('morgan');
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDataBase = require("./config/db");

const app = express();

// Log API Requests
app.use(morgan('common'));

//connection from db here
connectDataBase(app);

app.use(cors());
app.use(express.json({ extended: false}));
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

//  adding routes
wrapRoutes(app);

app.on("ready", () => {
  app.listen(3000, () => {
    console.log("Server is up on port", 3000);
  });
});

module.exports = app;