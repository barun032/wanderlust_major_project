const express = require("express");
const router = express.Router({mergeParams: true}); // check app.js
const wrapAsync = require('../utils/wrapAsync.js');
const { validateReviews, isReviewAuthor, isLoggedIn } = require("../middlewares.js");
const reviewColtroller = require("../controllers/review.js");

//Review route (post)
// For Create Reviews
router.post("/", 
    validateReviews, 
    wrapAsync(reviewColtroller.createReview));

// DELETE ROUTE 
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewColtroller.destroyReview));

module.exports = router;