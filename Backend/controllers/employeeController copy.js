const Employee = require('../models/employee');

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
        name,
        phone,
        license,
        dob,
        address,
        joiningDate,
        deposit,
        returnAmount = 'NA',
        resignDate,
    } = req.body;

    const completionDate = new Date(joiningDate);
    completionDate.setMonth(completionDate.getMonth() + 4);

    const newEmployee = new Employee({
        name,
        phone,
        license,
        dob,
        address,
        joiningDate,
        completionDate,
        deposit,
        returnAmount,
        resignDate,
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

