const fs = require("fs");
const path = require("path");
const Employee = require("../models/employee");

// Fetch all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEmployeesByData = async (req, res) => {
  try {
    const searchQuery = req.params.data; // Extract search query from URL param

    const employees = await Employee.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive name match
        { employeeNumber: searchQuery }, // Exact match for number fields
        { contactNumber: searchQuery },
        { department: { $regex: searchQuery, $options: "i" } }, // Example: department
      ],
    });

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Ensure uploads directory exists
const ensureUploadsFolder = () => {
  const uploadsDir = path.join(__dirname, "../../uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
};

// Add a new employee with image upload
const addEmployee = async (req, res) => {
  ensureUploadsFolder();

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
    joiningDate,
    deposit,
    resignStatus = "No",
    returnAmount = "NA",
    resignDate,
    createdBy,
    modifiedBy,
  } = req.body;

  const probationCompletionDate = joiningDate
    ? new Date(
        new Date(joiningDate).setMonth(new Date(joiningDate).getMonth() + 4)
      )
    : undefined;

  let profilePhotoPath = "";

  if (req.file) {
    const uploadsDir = path.join(__dirname, "../../uploads");
    const fileName = `${name}_${employeeNumber}_profilePic${path.extname(
      req.file.originalname
    )}`;
    profilePhotoPath = path.join(uploadsDir, fileName);
    fs.renameSync(req.file.path, profilePhotoPath);
  }

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
    // profilePhoto: profilePhotoPath,
    joiningDate,
    probationCompletionDate,
    deposit,
    resignStatus,
    returnAmount,
    resignDate,
    createdDate: new Date(),
    createdBy,
    modifiedDate: new Date(),
    modifiedBy,
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
  const updates = req.body; // Correctly getting update data
  const { modifiedBy } = req.body;

  try {
    const existingEmp = await Employee.findById(id);
    if (!existingEmp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Ensure modifiedDate is set correctly
    updates.modifiedDate = new Date().toISOString();
    updates.modifiedBy = modifiedBy || "Unknown";

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { $set: updates }, // ✅ Correctly applying updates
      { new: true, runValidators: true } // ✅ Returns updated employee
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      updatedEmployee,
    });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(400).json({ message: "Error updating employee", error: err.message });
  }
};



// Delete an employee by ID
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Employee deleted successfully", deletedEmployee });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting employee", error: err.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeesByData,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
