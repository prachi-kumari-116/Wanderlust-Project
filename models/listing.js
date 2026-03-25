const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    }, 
    description: String,
    image: {
        type:{
            filename: String,
            url: String
        },
              //type: String,
               default:"https://unsplash.com/photos/a-blurry-photo-of-a-plant-in-the-snow-_VGtRB7Hx50",
               set: (v) => 
                    v=== "" 
                    ? "https://unsplash.com/photos/a-blurry-photo-of-a-plant-in-the-snow-_VGtRB7Hx50" 
                    : v,
        
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports= Listing;

