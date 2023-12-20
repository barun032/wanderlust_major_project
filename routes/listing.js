const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const listingControler = require("../controllers/listing.js");

const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });



// -------- Index Route-----------------
// router.get("/",
//  wrapAsync(listingControler.index));

//----------if we are using same route(merge the route)---------------
router.route("/")
    .get(wrapAsync(listingControler.index))
    .post(isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingControler.createNewListing));
        
//--------Create Route---------
router.get("/new",
    isLoggedIn,
    listingControler.renderListingForm); // it shoud be before show route(got some Error!)

router.route("/:id")
    .get(wrapAsync(listingControler.showListing))
    .put(isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingControler.updateListing))
    .delete(isLoggedIn,
        isOwner,
        wrapAsync(listingControler.destroyListing));


// router.post("/", 
// isLoggedIn, 
// validateListing, 
// wrapAsync(listingControler.createNewListing));

// ---------Show Route--------
// router.get("/:id",
//     wrapAsync(listingControler.showListing));


//-----------Edit Route--------------
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingControler.renderEditForm));



//------------Update Route---------
// router.put("/:id",
// isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingControler.updateListing)
//     );


//---------Delete Route-----------
// router.delete("/:id",
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingControler.destroyListing));

module.exports = router;