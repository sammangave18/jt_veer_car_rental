import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import "./Employee_master.css";

const Employee_master = () => {
  const [employees, setEmployees] = useState([]); // Employee adding
  const [searchTerm, setSearchTerm] = useState(""); // Search in the table
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false); // Open modal
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [editingEmployee, setEditingEmployee] = useState(null); // Edit employee
  const [newEmployee, setNewEmployee] = useState({
    role: "",
    employeeNumber: "",
    name: "",
    phone: "",
    emergencyContact: "",
    email: "",
    licenseNumber: "",
    aadhaarNumber: "",
    panNumber: "",
    dob: "",
    address: "",
    bloodGroup: "",
    profilePhoto: null, // Expected as Base64 or binary data
    joiningDate: "",
    deposit: "",
    returnAmount: "NA",
    resignStatus: "No",
    resignDate: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees: ", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   setNewEmployee({ ...newEmployee, profilePhoto: e.target.files[0] });
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewEmployee({
      ...newEmployee,
      profilePhoto: file, // Store the file in the state
    });
  };

  //  Function Add new employee
  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // Genrate emp number

  useEffect(() => {
    if (newEmployee.role) {
      generateEmployeeNumber(newEmployee.role);
    }
  }, [newEmployee.role, employees]);

  const generateEmployeeNumber = (role) => {
    const prefix = role === "admin" ? "AD" : role === "driver" ? "DR" : "";
    if (!prefix) return;
  
    // Ensure employees exist and are in the expected format
    if (!Array.isArray(employees) || employees.length === 0) {
      console.warn("Employees array is empty or not an array");
      return;
    }
  
    const roleEmployees = employees.filter(
      (emp) => emp.employeeNumber && emp.employeeNumber.startsWith(prefix) // Safe check
    );
  
    let lastNumber = 0;
    if (roleEmployees.length > 0) {
      lastNumber = Math.max(
        ...roleEmployees.map((emp) =>
          parseInt(emp.employeeNumber.replace(prefix, ""), 10) || 0
        )
      );
    }
  
    const nextEmployeeNumber = `${prefix}${String(lastNumber + 1).padStart(
      3,
      "0"
    )}`; // AD001, DR002, etc.
  
    setNewEmployee((prev) => ({
      ...prev,
      employeeNumber: nextEmployeeNumber,
    }));
  };
  

  // useEffect(() => {
  //   if (newEmployee.role) {
  //     generateEmployeeNumber(newEmployee.role);
  //   }
  // }, [newEmployee.role, employees]);

  const handleAddEmployee = () => {
    if (
      !newEmployee.name ||
      !newEmployee.employeeNumber ||
      !newEmployee.role ||
      !newEmployee.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const formData = new FormData();
  
    // Append employee data to FormData
    for (const [key, value] of Object.entries(newEmployee)) {
      if (key === "profilePhoto" && value) {
        formData.append(key, value); // Append file as it is
      } else {
        formData.append(key, value.toString()); // Convert other fields to string
      }
    }
  
    const employeeNumber1 = localStorage.getItem("employeeNumber"); // Get logged-in user ID
  
    // Append creator details
    formData.append("createdBy", employeeNumber1);
    formData.append("modifiedBy", employeeNumber1);
  
    // Make the axios POST request with FormData
    axios
      .post("http://localhost:5000/api/employees", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      })
      .then((res) => {
        setEmployees([...employees, res.data]);
  
        // Reset new employee form
        setNewEmployee({
          role: "",
          employeeNumber: "",
          name: "",
          phone: "",
          emergencyContact: "",
          email: "",
          licenseNumber: "",
          aadhaarNumber: "",
          panNumber: "",
          dob: "",
          address: "",
          bloodGroup: "",
          profilePhoto: null, // Expected as Base64 or binary data
          joiningDate: "",
          deposit: "",
          returnAmount: "NA",
          resignStatus: "No",
          resignDate: "",
        });
  
        fetchEmployees();
        setEditingEmployee(null);
        setModalMode("add");
        setIsModalOpen(false); // Close the modal
      })
      .catch((err) => console.error("Error adding employee: ", err));
  };
  
// Function to handle Edit button click
const handleEditEmployee = (employee) => {
  console.log("Editing Employee:", employee);
  console.log("click edit");
  setModalMode("edit");
  setEditingEmployee(employee); // Make a copy to avoid direct mutation
  setIsModalOpen(true); // Open the modal
};

// Function to handle employee update
// Function to handle employee update
const updateEmployee = () => {
  if (!editingEmployee || !editingEmployee._id) {
    console.error("Error: editingEmployee is undefined or missing _id", editingEmployee);
    alert("Error: No employee selected for update.");
    return;
  }

  const formData = new FormData();
  for (const [key, value] of Object.entries(editingEmployee)) {
    if (key === "profilePhoto" && value) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    } else {
      formData.append(key, "");
    }
  }

  const employeeNumber1 = localStorage.getItem("employeeNumber"); 
  formData.append("modifiedBy", employeeNumber1);
  formData.append("modifiedDate", new Date().toISOString()); 

  axios
    .put(
      `http://localhost:5000/api/employees/${editingEmployee._id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    .then((res) => {
      console.log("Response from update:", res.data); // Debugging log

      if (res.data.updatedEmployee) { // Check if the correct object is returned
        alert("Employee updated successfully!");

        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp._id === editingEmployee._id ? res.data.updatedEmployee : emp
          )
        );

        setEditingEmployee(null);
        setModalMode("add");
        setIsModalOpen(false);
      } else {
        console.error("Unexpected response format:", res.data);
        alert("Unexpected error occurred.");
      }
    })
    .catch((err) => {
      console.error("Error updating employee:", err);
      alert("Failed to update employee.");
    });
};

// Function to handle input change in the modal
const handleEditingEmployeeChange = (e) => {
  const { name, value } = e.target;
  setEditingEmployee((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};



  // Function delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:5000/api/employees/${id}`)
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp._id !== id)
        );
      })
      .catch((err) => console.error("Error deleting employee: ", err));
  };

  // Function Search
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredEmployees = employees.filter((emp) =>
    Object.values(emp).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Format date
  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "N/A";

  // Function Pagination
  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const displayedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // sort employee
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const sortEmployees = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...displayedEmployees].sort((a, b) => {
    if (!sortConfig.key) return 0; // No sorting by default
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployees(response.data); // Update table data
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    // main container
    <div className="container my-4">
      <h1 className="text-center mb-4">Employee Master</h1>
      {/* search and add employee btn */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Search by any field..."
          value={searchTerm}
          onChange={handleSearch}
          className="form-control w-50"
        />
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Employee
        </button>
        <button
          className="btn btn-primary btn-sm mx-2"
          onClick={fetchEmployees}
        >
          🔄 Refresh
        </button>
      </div>

      {/*employee table */}
      <div className="table-responsive" style={{ maxHeight: "400px" }}>
        <table className="table table-bordered table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th onClick={() => sortEmployees("role")}>Role</th>
              <th onClick={() => sortEmployees("employeeNumber")}>
                Employee Number
              </th>
              <th onClick={() => sortEmployees("name")}>Name</th>
              <th onClick={() => sortEmployees("phone")}>Phone</th>
              <th onClick={() => sortEmployees("emergencyContact")}>
                Emergency Contact
              </th>
              <th onClick={() => sortEmployees("email")}>Email</th>
              <th onClick={() => sortEmployees("licenseNumber")}>
                License Number
              </th>
              <th onClick={() => sortEmployees("aadhaarNumber")}>
                Aadhaar Number
              </th>
              <th onClick={() => sortEmployees("panNumber")}>PAN Number</th>
              <th onClick={() => sortEmployees("dob")}>DOB</th>
              <th onClick={() => sortEmployees("address")}>Address</th>
              <th onClick={() => sortEmployees("bloodGroup")}>Blood Group</th>
              <th onClick={() => sortEmployees("joiningDate")}>Joining Date</th>
              <th onClick={() => sortEmployees("probationCompletionDate")}>
                Probation Completion Date
              </th>
              <th onClick={() => sortEmployees("deposit")}>Deposit</th>
              <th onClick={() => sortEmployees("resignStatus")}>
                Resign Status
              </th>
              <th onClick={() => sortEmployees("returnAmount")}>
                Return Amount
              </th>
              <th onClick={() => sortEmployees("resignDate")}>Resign Date</th>
              <th onClick={() => sortEmployees("createdDate")}>Created Date</th>
              <th onClick={() => sortEmployees("createdBy")}>Created By</th>
              <th onClick={() => sortEmployees("modifiedDate")}>
                Modified Date
              </th>
              <th onClick={() => sortEmployees("modifiedBy")}>Modified By</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map((emp, index) => (
              <tr key={emp._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mx-1"
                    onClick={() => handleEditEmployee(emp)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>{emp.role}</td>
                <td>{emp.employeeNumber}</td>
                <td>{emp.name}</td>
                <td>{emp.phone}</td>
                <td>{emp.emergencyContact}</td>
                <td>{emp.email}</td>
                <td>{emp.licenseNumber}</td>
                <td>{emp.aadhaarNumber}</td>
                <td>{emp.panNumber}</td>
                <td>{formatDate(emp.dob)}</td>
                <td>{emp.address}</td>
                <td>{emp.bloodGroup}</td>
                {/* <td>
                  {/* "ys" */}
                {/* {emp.profilePhoto ? (
                    <img
                      src={`data:image/jpeg;base64,${Buffer.from(
                        emp.profilePhoto
                      ).toString("base64")}`}
                      alt="Profile"
                      className="img-thumbnail"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    "No Photo"
                  )} 
                </td> */}
                <td>{formatDate(emp.joiningDate)}</td>
                <td>{formatDate(emp.probationCompletionDate)}</td>
                <td>{emp.deposit}</td>
                <td>{emp.resignStatus}</td>
                <td>{emp.returnAmount}</td>
                <td>{formatDate(emp.resignDate)}</td>
                <td>{formatDate(emp.createdDate)}</td>
                <td>{emp.createdBy}</td>
                <td>{formatDate(emp.modifiedDate)}</td>
                <td>{emp.modifiedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination btn */}
      {totalPages > 1 && (
        <Pagination className="justify-content-left">
          <Pagination.Prev
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePagination(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}

      {/* Modal for add or edit employee */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-dialog"
            style={{
              width: "500px",
              maxHeight: "80%",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="modal-content"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div className="modal-header" style={{ flexShrink: 0 }}>
                <h5 className="modal-title">
                  {modalMode === "edit" ? "Edit Employee" : "Add New Employee"}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => {
                    setIsModalOpen(false);
                    setModalMode("add");
                    setEditingEmployee(null);
                    setNewEmployee({
                      role: "",
                      employeeNumber: "",
                      name: "",
                      phone: "",
                      emergencyContact: "",
                      email: "",
                      licenseNumber: "",
                      aadhaarNumber: "",
                      panNumber: "",
                      dob: "",
                      address: "",
                      bloodGroup: "",
                      profilePhoto: "",
                      joiningDate: "",
                      deposit: "",
                      returnAmount: "NA",
                      resignStatus: "No",
                      resignDate: "",
                    });
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                >
                  &times;
                </button>
              </div>
              <div
                className="modal-body"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "1rem",
                  maxHeight: "60vh",
                  scrollbarWidth: "thin",
                }}
              >
                <form>
                  <div className="form-group">
                    <label>Employee Role:</label>
                    <select
                      name="role"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.role || ""
                          : newEmployee.role
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="driver">Driver</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Employee Number:</label>
                    <input
                      type="text"
                      name="employeeNumber"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.employeeNumber || ""
                          : newEmployee.employeeNumber
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.name || ""
                          : newEmployee.name
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.phone || ""
                          : newEmployee.phone
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Emergency Contact:</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.emergencyContact || ""
                          : newEmployee.emergencyContact
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.email || ""
                          : newEmployee.email
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>License Number:</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.licenseNumber || ""
                          : newEmployee.licenseNumber
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Aadhaar Number:</label>
                    <input
                      type="text"
                      name="aadhaarNumber"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.aadhaarNumber || ""
                          : newEmployee.aadhaarNumber
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>PAN Number:</label>
                    <input
                      type="text"
                      name="panNumber"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.panNumber || ""
                          : newEmployee.panNumber
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                      type="date"
                      name="dob"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.dob || ""
                          : newEmployee.dob
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Address:</label>
                    <textarea
                      name="address"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.address || ""
                          : newEmployee.address
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Blood Group:</label>
                    <input
                      type="text"
                      name="bloodGroup"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.bloodGroup || ""
                          : newEmployee.bloodGroup
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Profile Photo:</label>
                    <input
                      type="file"
                      name="profilePhoto"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Joining Date:</label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.joiningDate || ""
                          : newEmployee.joiningDate
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Deposit:</label>
                    <input
                      type="number"
                      name="deposit"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.deposit || ""
                          : newEmployee.deposit
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Return Amount:</label>
                    <input
                      type="text"
                      name="returnAmount"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.returnAmount || ""
                          : newEmployee.returnAmount
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Resign Status:</label>
                    <select
                      name="resignStatus"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.resignStatus || ""
                          : newEmployee.resignStatus
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Resign Date:</label>
                    <input
                      type="date"
                      name="resignDate"
                      value={
                        modalMode === "edit"
                          ? editingEmployee?.resignDate || ""
                          : newEmployee.resignDate
                      }
                      onChange={
                        modalMode === "edit"
                          ? handleEditingEmployeeChange
                          : handleNewEmployeeChange
                      }
                      className="form-control"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={
                      modalMode === "edit" ? updateEmployee : handleAddEmployee
                    }
                  >
                    {modalMode === "edit" ? "Save Changes" : "Add Employee"}
                  </button>
                </form>
              </div>
              <div className="modal-footer" style={{ flexShrink: 0 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                    setModalMode("add");
                    setEditingEmployee(null);
                    setNewEmployee({
                      role: "",
                      employeeNumber: "",
                      name: "",
                      phone: "",
                      emergencyContact: "",
                      email: "",
                      licenseNumber: "",
                      aadhaarNumber: "",
                      panNumber: "",
                      dob: "",
                      address: "",
                      bloodGroup: "",
                      profilePhoto: "",
                      joiningDate: "",
                      deposit: "",
                      returnAmount: "NA",
                      resignStatus: "No",
                      resignDate: "",
                    });
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee_master;
