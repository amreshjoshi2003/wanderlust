const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) =>{
    console.log(err);
});

async function main () {
    await mongoose.connect(MONGO_URL);
    
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodoverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));




app.get("/" , ( req , res)=> {
     res.render('index');
})
//index- route 
app.get("/Listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
});



//New Route 
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});
//Show Route

app.get("/listings/:id",async (req, res) => {
    let{id} = req.params;
  const listing = await Listing.findById(id)
  res.render("listings/show.ejs", { listing});

});

//Create Route
app.post("/listing", async (req, res) => {
   const newListing = new Listing (req.body.listing);
   newListing.save();
    res.redirect("/listings");
});


//Edit Route
app.get("/listings/:id/edit", async (req,res) => {
      let{id} = req.params;
  const listing = await Listing.findById(id)
  res.render("listings/edit.ejs",{listing});
});


//Update Route
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//DELETE Route
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

// app.get("/testListing", async (req, res) => {
//     try {
//         let sampleListing = new Listing({
//             title: "My New Villa",
//             description: "By New beach",
//             price: 1200,
//             location: "Calangute, Goa",
//             country: "India",
//         });
//         await sampleListing.save();
//         console.log("sample was saved");
//         res.send("successful testing");
//     } catch (err) {
//         console.error("Error saving listing:", err);
//         res.status(500).send("Error saving listing");
//     }
// });




app.listen(8080, () => {
    console.log ("server is listenining to port 8080"); 
} )