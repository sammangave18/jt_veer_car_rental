import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "./Trips_management.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Trips_management = () => {
  const [trips, setTrips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [newTrip, setNewTrip] = useState({
    tripNumber: "",
    tripStatus: "",
    employeeNumber: "",
    driverName: "",
    driverContactNumber: "",
    vehicleType: "",
    vehicleNumber: "",
    customerName: "",
    customerContactNumber: "",
    currentLocation: "",
    pickupLocation: "",
    dropLocation: "",
    startDate: "",
    startTime: "",
    startingVehicleImage: "",
    dropVehicleImage: "",
    journeyStartDateTime: "",
    journeyEndDateTime: "",
    isReturn: false,
    days: "",
    package: "",
    perKMRate: "",
    extraKM: "",
    agentOrCustomer: "",
    advance: "",
    cashCollection: "",
    mode: "",
    split: "",
    driverAllowance: "",
    otherCollection: "",
    toll: "",
    createdDate: "",
    modifiedDate: "",
    createdBy: "",
    modifiedBy: "",
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      return [];
    }
  };
  // Fetch the employees list on component mount
  useEffect(() => {
    const loadEmployees = async () => {
      const employeeData = await fetchEmployees();
      setEmployees(employeeData);
    };
    loadEmployees();
  }, []);

  const handleEmployeeSelect = (e) => {
    const empNum = e.target.value;
    const employee = employees.find((emp) => String(emp.employeeNumber) === empNum);
    if (employee) {
      setSelectedEmployee(employee);
    } else {
      setSelectedEmployee({});
    }
  };

  // Fetch trips on mount
  useEffect(() => {
    axios("http://localhost:5000/api/trips")
      .then((res) => {
        setTrips(res.data); // Axios response already contains the data
      })
      .catch((err) => {
        console.error("Error fetching trips:", err);
      });
  }, []);

  // const handleNewTripChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewTrip({ ...newTrip, [name]: value });
  // };

  const handleNewTripChange = (e) => {
    const { name, value } = e.target;
    setNewTrip((prevTrip) => ({
      ...prevTrip,
      [name]: value,
    }));

    // If the driver name changes, update the driver contact number automatically
    if (name === "driverName") {
      const selectedDriver = employees.find(
        (employee) => employee.name === value
      );
      if (selectedDriver) {
        setNewTrip((prevTrip) => ({
          ...prevTrip,
          driverContactNumber: selectedDriver.phone, // Populate contact number
        }));
      }
    }
  };

  // Handle Add New Trip
  const handleAddTrip = (event) => {
    event.preventDefault();

    const employeeNumber = localStorage.getItem("employeeNumber"); // Get logged-in user ID

    axios
      .post(
        "http://localhost:5000/api/trips",
        {
          ...newTrip,
          returnTrip: Boolean(newTrip.isReturn),
          createdBy: employeeNumber, // ✅ Ensure createdBy is set when adding the trip
          modifiedBy: employeeNumber, // ✅ Set modifiedBy initially
          createdDate: new Date().toISOString(), // ✅ Ensure createdDate is set
          modifiedDate: new Date().toISOString(), // ✅ Set modifiedDate initially
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setTrips((prevTrips) => [...prevTrips, res.data]);
        setNewTrip({
          tripNumber: generateTripNum(),
          tripStatus: "",
          employeeNumber: "",
          driverName: "",
          driverContactNumber: "",
          vehicleType: "",
          vehicleNumber: "",
          customerName: "",
          customerContactNumber: "",
          currentLocation: "",
          pickupLocation: "",
          dropLocation: "",
          startDate: "",
          startTime: "",
          startingVehicleImage: "",
          dropVehicleImage: "",
          journeyStartDateTime: "",
          journeyEndDateTime: "",
          isReturn: false,
          days: "",
          package: "",
          perKMRate: "",
          extraKM: "",
          agentOrCustomer: "",
          advance: "",
          cashCollection: "",
          mode: "",
          split: "",
          driverAllowance: "",
          otherCollection: "",
          toll: "",
          createdDate: "",
          modifiedDate: "",
          createdBy: "", // Keep these blank after adding to reset form
          modifiedBy: "",
        });

        // toast.success("Trip added successfully!", { autoClose: 2000, pauseOnHover: false, draggable: false });
        fetchTrips();
        generateTripNum();
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Error adding trip:", err));
  };

  // Handle Delete Trip
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (!confirmDelete) return;

    fetch(`http://localhost:5000/api/trips/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== id));
      })
      .catch((err) => console.error("Error deleting trip:", err));
  };

  // Handle Search
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredTrips = trips.filter((trip) =>
    Object.values(trip).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "N/A";

  // Function Pagination
  // const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  const handlePagination = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage);
  const displayedTrips = filteredTrips.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // refresh

  const fetchTrips = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/trips");
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  // edit
  const handleEditTrips = (employee) => {
    console.log("Editing Employee:", employee);
    console.log("click edit");
    // setModalMode("edit");
    // setEditingEmployee(employee); // Make a copy to avoid direct mutation
    // setIsModalOpen(true); // Open the modal
  };

  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleUpdateTrip = async (tripData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/trips/${tripData._id}`,
        tripData, // ✅ Directly send tripData as the request body
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Trip updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  const handleEdit = (trip) => {
    setEditingRow(trip._id);
    setEditedData(trip); // Copy trip data for editing
  };

  const handleChange = (e, field) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSave = () => {
    const updatedTrip = {
      ...editedData,
      modifiedBy: localStorage.getItem("employeeNumber"), // Update modifiedBy
      modifiedDate: new Date().toISOString(), // Ensure modifiedDate updates
    };

    handleUpdateTrip(updatedTrip); // Call API to save changes
    setEditingRow(null); // Exit edit mode
    toast.success("Saved successfully!", { autoClose: 2000 });
  };

  // genrate new trip number

  useEffect(() => {
    generateTripNum();
  }, [trips]); // Run when trips update

  const generateTripNum = () => {
    const prefix = "TR";

    // Get the last trip number from the list
    const lastTrip = trips
      .filter((trip) => trip.tripNumber.startsWith(prefix))
      .sort(
        (a, b) =>
          parseInt(a.tripNumber.replace(prefix, ""), 10) -
          parseInt(b.tripNumber.replace(prefix, ""), 10)
      )
      .pop(); // Get the last trip

    let lastNumber = 0;
    if (lastTrip) {
      lastNumber = parseInt(lastTrip.tripNumber.replace(prefix, ""), 10);
    }

    const nextTripNumber = `${prefix}${String(lastNumber + 1).padStart(
      3,
      "0"
    )}`; // TRIP001, TRIP002...

    setNewTrip((prev) => ({
      ...prev,
      tripNumber: nextTripNumber,
    }));
  };

  const userRole = localStorage.getItem("role")?.toLowerCase(); // Ensure case-insensitive check

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Trips Master</h1>
      {/* search and add trips btn */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Search by any field..."
          start
          value={searchTerm}
          onChange={handleSearch}
          className="form-control w-50"
        />
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
          disabled={userRole === "driver"}
        >
          Add New Trip
        </button>
        <button className="btn btn-primary btn-sm mx-2" onClick={fetchTrips}>
          🔄 Refresh
        </button>
      </div>
      {/*Trips table */}
      <div className="table-responsive" style={{ maxHeight: "400px" }}>
        <table className="table table-bordered table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              {/* Define all 34 columns */}
              <th>#</th>
              <th>Actions</th>
              <th>Trip Number</th>
              <th>Trip Status</th>
              <th>Employee Id</th>
              <th>Driver Name</th>
              <th>Driver Contact</th>
              <th>Vehicle Type</th>
              <th>Vehicle Number</th>
              <th>Customer Name</th>
              <th>Customer Contact</th>
              <th>Current Location</th>
              <th>Pickup Location</th>
              <th>Drop Location</th>
              <th>Start Date</th>
              <th>Start Time</th>
              {/* <th>Starting Vehicle Image</th>
              <th>Drop Vehicle Image</th> */}
              <th>Journey Start DateTime</th>
              <th>Journey End DateTime</th>
              <th>Is Return</th>
              <th>Days</th>
              <th>Package</th>
              <th>Per KM Rate</th>
              <th>Extra KM</th>
              <th>Agent/Customer</th>
              <th>Advance</th>
              <th>Cash Collection</th>
              <th>Mode</th>
              <th>Split</th>
              <th>Driver Allowance</th>
              <th>Other Collection</th>
              <th>Toll</th>
              <th>Created Date</th>
              <th>Modified Date</th>
              <th>Created By</th>
              <th>Modified By</th>
            </tr>
          </thead>
          <tbody>
            {displayedTrips.map((trip, index) => (
              <tr key={trip._id}>
                <td>{index + 1}</td>
                <td>
                  {editingRow === trip._id ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={handleSave}
                      disabled={userRole === "driver"} // 🔹 Disable for drivers
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(trip)}
                      disabled={userRole === "driver"} // 🔹 Disable for drivers
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDelete(trip._id)}
                    disabled={userRole === "driver"} // 🔹 Disable for drivers
                  >
                    Delete
                  </button>
                </td>
                {Object.keys(trip).map((field, i) =>
                  field !== "_id" && field !== "__v" && field !== "actions" ? (
                    <td key={i}>
                      {editingRow === trip._id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedData[field] || ""}
                          onChange={(e) => handleChange(e, field)}
                        />
                      ) : field === "createdDate" ? (
                        new Date(trip.createdDate).toLocaleString()
                      ) : field === "modifiedDate" ? (
                        <>
                          {console.log(trip.modifiedDate, "date new")}
                          {new Date(trip.modifiedDate).toLocaleString()}
                        </>
                      ) : field === "createdBy" ? (
                        trip.createdBy || "Unknown" // ✅ Always preserve creator
                      ) : field === "modifiedBy" ? (
                        <>
                          {console.log(trip.modifiedBy, "by new")}
                          {trip.modifiedBy ||
                            localStorage.getItem("employeeNumber")}
                        </>
                      ) : field === "returnTrip" ? (
                        trip.returnTrip ? (
                          "Yes"
                        ) : (
                          "No"
                        )
                      ) : (
                        trip[field]
                      )}
                    </td>
                  ) : null
                )}
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

      {isModalOpen && (
        <div className="modal-overlay" style={styles.overlay}>
          <div
            className="modal-dialog"
            style={{
              ...styles.dialog,
              // width: "720px",
              // height: "340px",
              overflowY: "auto",
            }}
          >
            <div className="modal-content" style={styles.content}>
              <div className="modal-header" style={styles.header}>
                <h5>Add New Trip</h5>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={styles.closeBtn}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body" style={styles.body}>
                <form>
                  <div
                    className="form-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "10px",
                    }}
                  >
                    <div className="form-group">
                      <label>Trip Number:</label>
                      <input
                        type="text"
                        name="tripNumber"
                        value={newTrip.tripNumber || ""} // ✅ Ensures no 'undefined' error
                        className="form-control"
                        readOnly // ✅ Prevents manual editing
                      />
                    </div>
                    <div className="form-group">
                      <label>Trip Status:</label>
                      <select
                        name="tripStatus"
                        onChange={handleNewTripChange}
                        className="form-control"
                        // required
                      >
                        <option value="">Select Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Not Started">Not Started</option>
                      </select>
                    </div>
                    {/* <div> */}
                    <div className="form-group">
                      <label>Select Driver by ID:</label>
                      <select
                        className="form-control"
                        onChange={handleEmployeeSelect} value={selectedEmployee.employeeNumber || ""}
                      >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                          <option
                            key={emp.employeeNumber}
                            value={String(emp.employeeNumber)}
                          >
                            {emp.employeeNumber} - {emp.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Driver Name:</label>
                      <input
                        type="text"
                        name="driverName"
                        value={selectedEmployee.name ?? ""}
                        className="form-control"
                        readOnly
                      />
                    </div>
                    {console.log(selectedEmployee.name)}

                    <div className="form-group">
                      <label>Driver Contact:</label>
                      <input
                        type="text"
                        name="driverContactNumber"
                        value={selectedEmployee.phone || ""}
                        className="form-control"
                        readOnly
                      />
                    </div>
                    {/* </div> */}
                    <div className="form-group">
                      <label>Vehicle Type:</label>
                      <input
                        type="text"
                        name="vehicleType"
                        onChange={handleNewTripChange}
                        className="form-control"
                        // required
                      />
                    </div>
                    <div className="form-group">
                      <label>Vehicle Number:</label>
                      <input
                        type="text"
                        name="vehicleNumber"
                        onChange={handleNewTripChange}
                        className="form-control"
                        // required
                      />
                    </div>
                    <div className="form-group">
                      <label>Customer Name:</label>
                      <input
                        type="text"
                        name="customerName"
                        onChange={handleNewTripChange}
                        className="form-control"
                        // required
                      />
                    </div>
                    <div className="form-group">
                      <label>Customer Contact:</label>
                      <input
                        type="text"
                        name="customerContactNumber"
                        onChange={handleNewTripChange}
                        className="form-control"
                        // required
                      />
                    </div>
                    <div className="form-group">
                      <label>Pickup Location:</label>
                      <input
                        type="text"
                        name="pickupLocation"
                        onChange={handleNewTripChange}
                        className="form-control"
                        // required
                      />
                    </div>
                    <div className="form-group">
                      <label>Drop Location:</label>
                      <input
                        type="text"
                        name="dropLocation"
                        onChange={handleNewTripChange}
                        className="form-control"
                        // required
                      />
                    </div>
                    <div className="form-group">
                      <label>Start Date:</label>
                      <input
                        type="date"
                        name="startDate"
                        onChange={handleNewTripChange}
                        className="form-control"
                        // required
                      />
                    </div>
                    <div className="form-group">
                      <label>Start Time:</label>
                      <input
                        type="time"
                        name="startTime"
                        onChange={handleNewTripChange}
                        className="form-control"
                        // required
                      />
                    </div>
                    {/* <div className="form-group">
                    <label>Starting Vehicle Image:</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "startingVehicleImage")} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Drop Vehicle Image:</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "dropVehicleImage")} className="form-control" />
                  </div>*/}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => handleAddTrip(e)}
                  >
                    Save Trip
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  overlay: {
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
  },
  dialog: {
    maxWidth: "90vw",
    maxHeight: "90vh",
    width: "1000px",
    height: "500px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    // padding: "20px"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderBottom: "1px solid #ddd",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: "1rem",
    maxHeight: "60vh",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
};
export default Trips_management;
