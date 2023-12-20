const Listing = require("./models/listing");
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema, reviewSchema } = require("./schemaValidation.js");
const Review = require('./models/reviews.js');


module.exports.isLoggedIn = (req, res, next) => {
    // if user is not loggedIn
    if (!req.isAuthenticated()) {
        req.session.redirectURL = req.originalUrl;
        req.flash("error", "You must be loging to create listing");
        return res.redirect("/login");
    }
    return next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectURL) {
        res.locals.redirectUrl = req.session.redirectURL;
    }
    return next();
}

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You have not permissions for modifing!");
        return res.redirect(`/listings/${id}`);
    }
    return next();
}

// validation Listings using Joi
module.exports.validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        return next();
    }
};

//validation reviews using Joi
module.exports.validateReviews = (req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        return next();
    }
};


module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    return next();
}