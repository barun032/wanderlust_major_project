const mongoose = require("mongoose");
const Listing = require('../models/listing.js');
const initData = require('./data.js');

// -----------------For database connetions-------------------
const mongooseURL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongooseURL);
}

const initDB = async()=>{
    await Listing.deleteMany({}); // first delete all the data
    initData.data = initData.data.map((obj)=>({
      ...obj,
      owner: "657aabbf409aef3406fb3713",
    }));

    await Listing.insertMany(initData.data); // insert all the data

    console.log("Data succesfully saved");
}
initDB(); // calling the function