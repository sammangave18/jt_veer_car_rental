const mongoose = require("mongoose")

// schema for city table

const CitySchema = new mongoose.Schema({
    cid:Number,
    cname: String
});

const demo = mongoose.model('city',CitySchema);

module.exports = demo;

// database databas
// tables collections
// row documents