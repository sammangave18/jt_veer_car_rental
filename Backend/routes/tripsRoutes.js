const express = require('express');
const { getAllTrips,addTrip, deleteTrip } = require('../controllers/tripController');

const router = express.Router();

router.get('/', getAllTrips); // Fetch all employees
router.post('/', addTrip);    // Add a new employee
router.delete('/:id',deleteTrip) // delete single employee by id

module.exports = router;
