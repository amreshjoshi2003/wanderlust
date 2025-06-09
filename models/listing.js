const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "defaultimage",
    },
    url: {
      type: String,
      default: "https://unsplash.com/photos/a-cozy-lounge-features-a-fireplace-and-firewood-stacks-JTWOWjraDUE",
      set: (v) =>
        v === ""
          ? "https://unsplash.com/photos/a-cozy-lounge-features-a-fireplace-and-firewood-stacks-JTWOWjraDUE"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
