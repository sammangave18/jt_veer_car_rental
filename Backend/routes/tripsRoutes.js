const express = require('express');
const { getAllTrips,addTrip, deleteTrip, updateTrip,getTripsForLoggedInEmployee } = require('../controllers/tripController');
// const upload = require('../middlewares/multer');


const router = express.Router();

router.get('/', getAllTrips); // Fetch all employees
router.post('/', addTrip);    // Add a new employee
router.delete('/:id',deleteTrip) // delete single employee by id
router.put("/:id", updateTrip); // delete single employee by id
// Define the route
router.get("/trips/:employeeNumber", getTripsForLoggedInEmployee);


module.exports = router;
