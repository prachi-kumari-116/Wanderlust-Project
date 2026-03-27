const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require ("path");
const methodOverride = require ("method-override");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

async function main() {
  await mongoose.connect(MONGO_URL);

}

app.get('/', (req, res) => {
  res.send('Hello!I am root.');
});

//INDEX ROUTE
app.get("/listings", async(req, res) => { 
  const allListings = await Listing.find({});
  res.render ("listings/index", {allListings});
} );

//NEW ROUTE
app.get("/listings/new", (req,res) => {
  res.render("listings/new");
});

//SHOW ROUTE
app.get("/listings/:id", async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
});

//CREATE ROUTE
app.post("/listings", async (req, res) => {
   const newListing = new Listing(req.body.listing);
   
   //console.log(newListing);
   await newListing.save();
   res.redirect("/listings"); 
   //let {title, description, image, price, country, location} = req.body;
   //let listing = req.body;
   
});

//EDIT ROUTE
app.get("/listings/:id/edit", async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", {listing});
});

//UPDATE ROUTE
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  //console.log(req.body);
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});


// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing ({
//        title: "My New Villa",
//        description: "By the beach",
//        price: 1200,
//        location: "Calangute, Goa",
//        country: "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.listen(8080, () => {
  console.log(" app listening on port 8080");
});