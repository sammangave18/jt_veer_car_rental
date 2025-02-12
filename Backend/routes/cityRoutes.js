const express = require('express');
const { getAllCities, addCity } = require('../controllers/cityController');

const router = express.Router();

router.get('/', getAllCities); // Fetch all cities
router.post('/', addCity);     // Add a new city

module.exports = router;
