const Joi = require('joi');

// -----------------listing schema validation-----------------
module.exports.listingSchema = Joi.object({
    listing: Joi.object({ // it shoud be listing object and required (inside this object the given property should have)
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null) // it allow empty or null
    }).required()
});

// -----------------review schema validation-----------------
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5)
    }).required()
});
