const express = require("express");
const app = express();
const bodyParser = require("body-parser");
bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "config.env") });

const session = require("express-session");
const passport = require("passport");

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use("/", require("./routes/auth"));
app.use("/mail", require("./routes/mail"));

app.listen(3001, () => console.log(`Server started on port 3001...`));
