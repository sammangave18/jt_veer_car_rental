const Trips = require('../models/trips');

// Fetch all trips
const getAllTrips = async (req, res) => {
    try {
        const trips = await Trips.find();
        // console.log(res.json(trips));
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new trip
const addTrip = async (req, res) => {
    const {
        tripNumber,
        tripStatus,
        driverName,
        driverContactNumber,
        vehicleType,
        vehicleNumber,
        customerName,
        customerContactNumber,
        currentLocation,
        pickupLocation,
        dropLocation,
        startDate,
        startTime,
        startingVehicleImage,
        dropVehicleImage,
        journeyStartDateTime,
        journeyEndDateTime,
        return: isReturn,
        days,
        package,
        perKMRate,
        extraKM,
        agentOrCustomer,
        advance,
        cashCollection,
        mode,
        split,
        driverAllowance,
        otherCollection,
        toll,
        createdDate,
        createdBy,
        modifiedBy,
    } = req.body;

    // Ensure required fields are present
    if (!tripNumber || !tripStatus || !driverContactNumber || !driverName || !vehicleType || !vehicleNumber 
        || !customerName || !customerContactNumber || !pickupLocation || !dropLocation) {
        return res.status(400).json({ 
            message: "Missing required fields: tripNumber, tripStatus, or driverContactNumber." 
        });
    }

    const newTrip = new Trips({
        tripNumber,
        tripStatus,
        driverName,
        driverContactNumber,
        vehicleType,
        vehicleNumber,
        customerName,
        customerContactNumber,
        currentLocation,
        pickupLocation,
        dropLocation,
        startDate,
        startTime,
        startingVehicleImage,
        dropVehicleImage,
        journeyStartDateTime,
        journeyEndDateTime,
        return: isReturn,
        days,
        package,
        perKMRate,
        extraKM,
        agentOrCustomer,
        advance,
        cashCollection,
        mode,
        split,
        driverAllowance,
        otherCollection,
        toll,
        createdDate,
        createdBy,
        modifiedBy,
    });

    try {
        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Delete trip by ID
const deleteTrip = async (req, res) => {
    const {id} = req.params;

    try{
        const deletedTrip = await Trips.findByIdAndDelete(id);

        if(!deletedTrip){
            return res.status(404).json({message:'Trip not found'});
        }
        res.status(200).json({message: 'Trip deleted successsfully', deletedTrip})
    } catch (err){
        res.status(500).json({ message: 'Error deleting Trip', error: err.message });
    }
}


module.exports = { getAllTrips, addTrip, deleteTrip };
