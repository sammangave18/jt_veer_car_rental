const Trips = require('../models/trips');
const Employee = require('../models/employee');

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

const getTripsForLoggedInEmployee = async (req, res) => {
    try {
        console.log("📌 API Called: getTripsForLoggedInEmployee");
        console.log("📌 Request Params:", req.params);
        console.log("📌 Query Params:", req.query);

        const { employeeNumber } = req.params;

        if (!employeeNumber) {
            console.log("❌ Missing employeeNumber");
            return res.status(400).json({ message: "Employee number is required" });
        }

        console.log(`🔍 Searching Employee: ${employeeNumber}`);
        const employee = await Employee.findOne({ employeeNumber: employeeNumber }).lean();
        console.log("🔎 Employee Data:", employee);

        if (!employee) {
            console.log("❌ Employee not found");
            return res.status(404).json({ message: "Employee not found" });
        }

        console.log(`✅ Employee Found: ${employee.name}`);

        let trips;
        if (req.query.role === "Admin") {
            console.log("👨‍💼 Role: Admin - Fetching all trips");
            trips = await Trips.find().lean();
        } else {
            console.log(`🚗 Role: Driver - Fetching trips for driver: ${employee.name}`);
            trips = await Trips.find({ driverName: new RegExp(`^${employee.name}$`, "i") }).lean();
        }

        console.log("📦 Trips Data:", trips);

        if (!trips.length) {
            console.log("❌ No trips found");
            return res.status(404).json({ message: "No trips found for this driver" });
        }

        res.status(200).json(trips);
    } catch (error) {
        console.error("❌ Error fetching trips:", error);
        res.status(500).json({ message: "Server error" });
    }
};



// Add a new trip
const addTrip = async (req, res) => {
    const {
        tripNumber,
        tripStatus,
        employeeNumber,
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
        // startingVehicleImage,
        // dropVehicleImage,
        journeyStartDateTime,
        journeyEndDateTime,
        returnTrip: isReturn,
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
        createdBy,
        modifiedBy,
    } = req.body;

    // Ensure required fields are present
    // if (!tripNumber || !tripStatus || !driverContactNumber || !driverName || !vehicleType || !vehicleNumber 
    //     || !customerName || !customerContactNumber || !pickupLocation || !dropLocation) {
    //     return res.status(400).json({ 
    //         message: "Missing required fields: tripNumber, tripStatus, or driverContactNumber." 
    //     });
    // }
     // Set timestamps
     const createdDate = new Date(); // Set created date when a new trip is created
     const modifiedDate = new Date(); // Initially, modifiedDate is the same as createdDate
 

    const newTrip = new Trips({
        tripNumber,
        tripStatus,
        employeeNumber,
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
        // startingVehicleImage,
        // dropVehicleImage,
        journeyStartDateTime,
        journeyEndDateTime,
        returnTrip: isReturn,
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
        modifiedDate,
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

// Update trip by ID
const updateTrip = async (req, res) => {
    const { id } = req.params;
    const { modifiedBy } = req.body;

    const modifiedDate = new Date().toISOString(); 

    try {
        const existingTrip = await Trips.findById(id); // Fetch existing trip

        if (!existingTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        const updatedTrip = await Trips.findByIdAndUpdate(
            id,
            { 
                $set: { 
                    ...req.body, 
                    modifiedDate,
                    modifiedBy: modifiedBy || "Unknown",
                    createdBy: existingTrip.createdBy // ✅ Ensure createdBy remains unchanged
                } 
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "Trip updated successfully", updatedTrip });
    } catch (err) {
        res.status(500).json({ message: "Error updating trip", error: err.message });
    }
};




module.exports = { getAllTrips, addTrip, deleteTrip,updateTrip,getTripsForLoggedInEmployee  };
