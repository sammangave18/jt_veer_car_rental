const City = require('../models/city');

// Fetch all cities
const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new city
const addCity = async (req, res) => {
  const { cid, cname } = req.body;

  if (!cid || !cname) {
    return res.status(400).json({ error: 'All fields (cid, cname) are required.' });
  }

  const newCity = new City({ cid, cname });

  try {
    const savedCity = await newCity.save();
    res.status(201).json(savedCity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllCities, addCity };
