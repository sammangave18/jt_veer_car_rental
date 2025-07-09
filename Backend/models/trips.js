const mongoose = require("mongoose");

const tripsSchema = new mongoose.Schema({
  tripNumber: {
    type: String,
    // required: true
  },
  tripStatus: {
    type: String,
    // required: true
    // enum: ['Not Started', 'In Progress', 'Completed']
  },
  employeeNumber: { type: String },
  driverName: {
    type: String,
    // required: true
  },
  driverContactNumber: {
    type: String,
    // required: true
  },
  vehicleType: {
    type: String,
    // required: true
  },
  vehicleNumber: {
    type: String,
    // required: true
  },
  customerName: {
    type: String,
    // required: true
  },
  customerContactNumber: {
    type: String,
    // required: true
  },
  currentLocation: {
    type: String,
  },
  pickupLocation: {
    type: String,
    // required: true
  },
  dropLocation: {
    type: String,
    // required: true
  },
  startDate: {
    type: Date,
  },
  startTime: {
    type: String,
  },
  startingVehicleImage: {
    type: Buffer,
    description: "Binary data of the starting vehicle image",
  },
  dropVehicleImage: {
    type: Buffer,
    description: "Binary data of the drop vehicle image",
  },
  journeyStartDateTime: {
    type: Date,
    description: "Start image upload date and time",
  },
  journeyEndDateTime: {
    type: Date,
    description: "Drop image upload date and time",
  },
  returnTrip: {
    type: Boolean,
    description: "Indicates whether it is a return trip",
  },
  days: {
    type: Number,
    description: "Number of days for the trip",
  },
  package: {
    type: String,
  },
  perKMRate: {
    type: Number,
    description: "Rate per kilometer",
  },
  extraKM: {
    type: Number,
    description: "Rate for extra kilometers",
  },
  agentOrCustomer: {
    type: String,
  },
  advance: {
    type: Number,
    description: "Advance payment amount",
  },
  cashCollection: {
    type: Number,
    description: "Total cash collected",
  },
  mode: {
    type: String,
    description: "Offline Online",
  },
  split: {
    type: String,
    description: "Split comments or additional information",
  },
  driverAllowance: {
    type: Number,
    description: "Allowance for the driver",
  },
  otherCollection: {
    type: Number,
    description: "Additional collections",
  },
  toll: {
    type: Number,
    description: "Toll charges",
  },
  createdDate: {
    type: Date,
  },
  modifiedDate: {
    type: Date,
  },
  createdBy: {
    type: String,
  },
  modifiedBy: {
    type: String,
  },
});

module.exports = mongoose.model("Trips", tripsSchema);
