const Listing = require("../models/listing");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    const listings = await Listing.find();
    res.render("./listings/index.ejs", { listings });
};

module.exports.renderListingForm = (req, res) => {
    res.render("./listings/new.ejs");
}

module.exports.createNewListing = async (req, res) => {

    // for geometry (mapBox)
    let response = await geoCodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
    .send()    
    
    let { path, filename } = req.file;
    const listing = new Listing(req.body.listing); // create new object of listing
    listing.owner = req.user._id; // create owner as current user
    listing.image = { url: path, filename };
    listing.geometry = response.body.features[0].geometry;
    let savedListing = await listing.save();
    console.log(savedListing);
    req.flash("success", "new listing created"); // creating flash after new listing 
    res.redirect("/listings");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: 'reviews', // inside listing populate reviews and inside review populate author
            populate: {
                path: "author"
            }
        })
        .populate("owner");

    //if listing not exits create error flash message
    if (!listing) {
        req.flash("error", "Listing you requested for are not exists!");
        res.redirect("/listings");
    }

    //    let currUser = res.locals.currUser; // to get currenUser info
    res.render("./listings/show.ejs", { listing });
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    //if listing not exits create error flash message
    if (!listing) {
        req.flash("error", "Listing you requested for are not exists!");
        res.redirect("/listings");
    }

    // during image preview decrease the image size
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300/w_300");

    res.render("./listings/edit.ejs", { listing, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (req.file) {
        let { path, filename } = req.file;
        listing.image = { url: path, filename };
        await listing.save();
    }

    req.flash("success", "Listing updated!"); // creating flash after listing updated
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id)
        .then(result => console.log(result)).catch(err => console.log(err));
    req.flash("success", "Listing deleted!"); // creating flash after listing deleted
    res.redirect("/listings");
}

// module.exports.searchListing = async(req, res) => {
    
// } 
