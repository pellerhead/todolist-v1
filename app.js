// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

// For the embedded java script (EJS)
app.set('view engine', 'ejs');

// So we can pass data from page back to Server
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + buton to add a new item"
});

const item3 = new Item({
  name: "<<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Succesfully added default items to database.");
  }
});

app.get("/", function(req, res) {

  const day = date.getDate();

  Item.find({}, function(err, foundItems){
    res.render("list", {listTitle: day, newListItems: foundItems});
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
