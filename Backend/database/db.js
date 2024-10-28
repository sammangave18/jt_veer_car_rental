const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test'); //creating connection with local db
    console.log("Database Connected");
}

module.exports=main;