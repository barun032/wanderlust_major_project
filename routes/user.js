const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const userController = require("../controllers/user.js");

//----------if we are using same route(merge the route)---------------
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl,
        passport.authenticate("local", { // middleware for user authenticate
            failureRedirect: "/login", // if failed :- redirect to /login page
            failureFlash: true // if failed:- show a flash message (passport flash message)
        }),
        userController.login);

//----------SignUp Routes--------------
// router.get("/signup", userController.renderSignupForm);

// router.post("/signup", wrapAsync(userController.signup));

// ------------Login Routes-----------
// router.get("/login", userController.renderLoginForm);
// router.post("/login",
//     saveRedirectUrl,
//     passport.authenticate("local", { // middleware for user authenticate
//         failureRedirect: "/login", // if failed :- redirect to /login page
//         failureFlash: true // if failed:- show a flash message (passport flash message)
//     }),
//     userController.login
// )


//-------LogOut Routes-----------
router.get("/logout", userController.logout);




module.exports = router;