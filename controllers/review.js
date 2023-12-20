const Review = require('../models/reviews.js');
const Listing = require('../models/listing.js');

module.exports.createReview = async(req, res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview =  new Review(req.body.review);
    listing.reviews.push(newReview);

    newReview.author = req.user;
    let rev = await newReview.save();
    await listing.save();

    console.log(rev);
    req.flash("success", "New review created!"); // creating flash after adding new review
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview = async(req, res)=>{
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); // remove those id's which is not present in reviews array
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!"); // creating flash after review deleted
    res.redirect(`/listings/${id}`);
}