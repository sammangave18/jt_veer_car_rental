const express = require("express");
const {
  getAllEmployees,
  getEmployeesByData,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
// const multer = require('multer');
const upload = require('../middlewares/multer');


const router = express.Router();

// Set up Multer to store the file in memory (as Buffer)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

router.get("/", getAllEmployees); // Fetch all employees
router.get("/search/:data", getEmployeesByData);
router.post("/", upload.single("profilePhoto"), addEmployee); // Add a new employee
router.put("/:id", updateEmployee); // delete single employee by id
router.delete("/:id", deleteEmployee); // delete single employee by id

module.exports = router;
