const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  cid: { type: Number, required: true },
  cname: { type: String, required: true },
});

module.exports = mongoose.model('City', citySchema);
