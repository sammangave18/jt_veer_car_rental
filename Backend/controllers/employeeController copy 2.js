const Employee = require('../models/employee');
const fs = require('fs');
const path = require('path');

// Fetch all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new employee
const addEmployee = async (req, res) => {
    const {
        role,
        employeeNumber,
        name,
        phone,
        emergencyContact,
        email,
        licenseNumber,
        aadhaarNumber,
        panNumber,
        dob,
        address,
        bloodGroup,
        profilePhoto, // Expected as Base64 or binary data
        joiningDate,
        deposit,
        resignStatus = 'No',
        returnAmount = 'NA',
        resignDate,
        createdBy,
        modifiedBy,
    } = req.body;

    const probationCompletionDate = joiningDate
        ? new Date(new Date(joiningDate).setMonth(new Date(joiningDate).getMonth() + 4))
        : undefined;

    const newEmployee = new Employee({
        role,
        employeeNumber,
        name,
        phone,
        emergencyContact,
        email,
        licenseNumber,
        aadhaarNumber,
        panNumber,
        dob,
        address,
        bloodGroup,
        profilePhoto: profilePhoto ? Buffer.from(profilePhoto, 'base64') : undefined, // Convert Base64 to Buffer
        joiningDate,
        probationCompletionDate,
        deposit,
        resignStatus,
        returnAmount,
        resignDate,
        createdDate: new Date(), // update only once not uppdate in update api
        createdBy,  // Assume `req.user` contains the authenticated user
        // createdBy: req.user?.name || 'System', // Assume `req.user` contains the authenticated user
        modifiedDate: new Date(),
        modifiedBy,
        // modifiedBy: req.user?.name || 'System',
    });

    try {
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an employee by ID
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    // if (updates.profilePhoto) {
    //     updates.profilePhoto = Buffer.from(updates.profilePhoto, 'base64'); // Convert Base64 to Buffer
    // }

    updates.modifiedDate = new Date();
    updates.modifiedBy = req.user?.name || 'System'; // Assume `req.user` contains the authenticated user

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true } // Return updated document and validate updates
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
    } catch (err) {
        res.status(400).json({ message: 'Error updating employee', error: err.message });
    }
};

// Delete an employee by ID
const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully', deletedEmployee });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting employee', error: err.message });
    }
};

module.exports = { getAllEmployees, addEmployee, updateEmployee, deleteEmployee };
