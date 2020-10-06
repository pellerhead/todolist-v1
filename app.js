// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];

// You can still push to an array.  Does not have to be a let.
const workItems = [];

// For the embedded java script (EJS)
app.set('view engine', 'ejs');

// So we can pass data from page back to Server
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  // Shwoing how to use different functions in a JavaScript Object/Class
  const day = date.getDate();
  //let day = date.getDay();

  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  })
});

app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push();
  res.redirect("/work");
});

app.get("/about", function(req, res) {
  res.render("about")
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});
