if (process.env.NODE_ENV != "production") {
    require("dotenv").config()
}

const express = require('express'); // npm package
const app = express();
const mongoose = require('mongoose'); // npm package
const path = require('path');
const methodOverride = require('method-override'); // npm package
const ExpressError = require('./utils/ExpressError.js');
const listingsRoute = require("./routes/listing.js");
const reviewsRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");
const session = require("express-session"); // npm package
const MongoStore = require('connect-mongo');
const flash = require("connect-flash"); // npm package
const passport = require("passport"); // npm package
const LocalStrategy = require("passport-local"); // npm package
const User = require("./models/user.js");

const Listing = require("./models/listing.js");

// -----------------For database connetions-------------------
// const mongooseURL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to DB");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}

//----------varibale for session ---------------
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600
});

store.on("error", (err)=>{
    console.log("ERROR ON MONGOSESSION STORE", err);
})

const sessionOption = {
    store,
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};



//--------------For reuse templateing(like navBar and footer)------------------
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);

const port = 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, '/public')));

app.use(session(sessionOption)); // use session options
app.use(flash()); // for flashing messagges

//---------------------for use passport-----------------------------------
app.use(passport.initialize()); // initialize passport every requiest
app.use(passport.session());  // use session for authenticate the user page to page
passport.use(new LocalStrategy(User.authenticate())); //for authenticate username & password from User model, User.authenticate():- authenticate username & password based on the provided username and password

passport.serializeUser(User.serializeUser()); // store user info in session
passport.deserializeUser(User.deserializeUser()); // remove user info from session

// ----------middleware for flash messages-----
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;  // save current user to local variable
    next();
})

app.get("/listings/search/:dest", async (req, res, next) => {
    let { search } = req.params;
    // let listing = await Listing.find({country: search});
    console.log(search);
    res.send("listing");
})
//------------All the routes-------------
app.use("/listings", listingsRoute);
app.use("/listings/:id/reviews", reviewsRoute); // mergeParams: -> to access listings id inside review 
app.use("/", userRoute);

app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
})
// ---------middleware error handler-------------
app.use((err, req, res, next) => {
    let { statusCode = 401, message = "something is wrong" } = err; // deconstruct the error from error
    res.status(statusCode).render('./listings/error.ejs', { message });
})

app.listen(port, () => {
    console.log("server is listening on ", port);
})
