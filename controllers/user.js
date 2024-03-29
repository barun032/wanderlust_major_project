const User = require("../models/user");

module.exports.renderLoginForm =  (req, res) => {
    res.render("./users/login.ejs");
}

module.exports.renderSignupForm =  (req, res) => {
    res.render("./users/signup.ejs");
}

module.exports.signup = async (req, res, next) => {
    try { // error handling (if user already exists....)
        let { email, username, password } = req.body;
        let newUser = new User({
            email: email,
            username: username
        });

        let registerdUser = await User.register(newUser, password);
        console.log(registerdUser);
        // after createing new user, directly login
        req.login(registerdUser, (er)=>{
            if(er){
                next(er);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.login = async (req, res) => {
    req.flash("success", "user login successfully");
    let redirectURL = res.locals.redirectUrl || "/listings";  //if res.locals.redirectUrl undefined then value is "/listings"
    res.redirect(redirectURL);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    })
}