const mongoose = require("mongoose");

// const employeeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   phone: { type: String, required: true },
//   license: String,
//   dob: Date,
//   address: String,
//   joiningDate: { type: Date, required: true },
//   completionDate: Date,
//   deposit: Number,
//   returnAmount: String,
//   resignDate: Date,
// });

const employeeSchema = new mongoose.Schema({
  role: { type: String}, // Role: Driver/Admin
  employeeNumber: { type: String}, // Employee Number
  name: { type: String}, // Employee Name
  phone: { type: String}, // Employee Phone Number
  emergencyContact: { type: String }, // Emergency Contact Number
  email: { type: String}, // Mail
  licenseNumber: { type: String }, // D License Number
  aadhaarNumber: { type: String }, // Aadhaar Number
  panNumber: { type: String}, // PAN Number
  dob: { type: Date }, // DOB
  address: { type: String}, // Address
  bloodGroup: { type: String }, // Blood Group
  profilePhoto: { type: Buffer }, // Profile Photo (optional)
  joiningDate: { type: Date }, // Joining Date
  probationCompletionDate: { type: Date }, // Probation - Four Months Completion
  deposit: { type: Number }, // Deposit
  resignStatus: { type: String }, // Resign (Yes/No)
  returnAmount: { type: String }, // Return Amount
  resignDate: { type: Date }, // Resign Date (optional)
  createdDate: { type: Date }, // Created Date
  modifiedDate: { type: Date }, // Modified Date
  createdBy: { type: String }, // Created By
  modifiedBy: { type: String }, // Modified By
});

module.exports = mongoose.model("Employee", employeeSchema);
