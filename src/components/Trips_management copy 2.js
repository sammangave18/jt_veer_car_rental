import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "./Trips_management.css";

const Trips_management = () => {
  const [trips, setTrips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [newTrip, setNewTrip] = useState({
    tripNumber: "",
    tripStatus: "",
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
    isReturn: "",
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
  const handleAddTrip = () => {

    // if (!newTrip.tripNumber || !newTrip.driverName || !newTrip.startDate) {
      // alert("Please fill in all required fields.");
      // return;
    // }

    axios
      .post("http://localhost:5000/api/trips", newTrip, {
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
      })
      .then((res) => {
        setTrips([...trips, res.data]);
        setNewTrip({
          tripNumber: "",
          tripStatus: "",
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
          isReturn: "",
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
        fetchTrips();

        // setIsModalOpen(false);
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

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Trips Master</h1>
      {/* search and add trips btn */}
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
              <th>Starting Vehicle Image</th>
              <th>Drop Vehicle Image</th>
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
    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
    <td>
      {editingRow === trip._id ? (
        <button className="btn btn-success btn-sm mx-1" onClick={() => handleSave(trip._id)}>
          Save
        </button>
      ) : (
        <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEditTrips(trip)}>
          Edit
        </button>
      )}
      <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(trip._id)}>
        Delete
      </button>
    </td>
    <td><input type="text" value={editedData.tripNumber || trip.tripNumber} onChange={(e) => handleChange(e, 'tripNumber')} /></td>
    <td>
      <select value={editedData.tripStatus || trip.tripStatus} onChange={(e) => handleChange(e, 'tripStatus')}>
        <option>Completed</option>
        <option>Pending</option>
        <option>Not Started</option>
      </select>
    </td>
    <td><input type="text" value={editedData.driverName || trip.driverName} onChange={(e) => handleChange(e, 'driverName')} /></td>
    <td><input type="text" value={editedData.driverContactNumber || trip.driverContactNumber} onChange={(e) => handleChange(e, 'driverContactNumber')} /></td>
    <td>
      <select value={editedData.vehicleType || trip.vehicleType} onChange={(e) => handleChange(e, 'vehicleType')}>
        <option>Sedan</option>
        <option>SUV</option>
        <option>Truck</option>
      </select>
    </td>
    <td><input type="text" value={editedData.vehicleNumber || trip.vehicleNumber} onChange={(e) => handleChange(e, 'vehicleNumber')} /></td>
    <td><input type="text" value={editedData.customerName || trip.customerName} onChange={(e) => handleChange(e, 'customerName')} /></td>
    <td><input type="text" value={editedData.customerContactNumber || trip.customerContactNumber} onChange={(e) => handleChange(e, 'customerContactNumber')} /></td>
    <td><input type="text" value={editedData.currentLocation || trip.currentLocation} onChange={(e) => handleChange(e, 'currentLocation')} /></td>
    <td><input type="text" value={editedData.pickupLocation || trip.pickupLocation} onChange={(e) => handleChange(e, 'pickupLocation')} /></td>
    <td><input type="text" value={editedData.dropLocation || trip.dropLocation} onChange={(e) => handleChange(e, 'dropLocation')} /></td>
    <td><input type="date" value={editedData.startDate || trip.startDate} onChange={(e) => handleChange(e, 'startDate')} /></td>
    <td><input type="time" value={editedData.startTime || trip.startTime} onChange={(e) => handleChange(e, 'startTime')} /></td>
    <td><input type="text" value={editedData.startingVehicleImage || trip.startingVehicleImage} onChange={(e) => handleChange(e, 'startingVehicleImage')} /></td>
    <td><input type="text" value={editedData.dropVehicleImage || trip.dropVehicleImage} onChange={(e) => handleChange(e, 'dropVehicleImage')} /></td>
    <td><input type="date" value={editedData.journeyStartDateTime || trip.journeyStartDateTime} onChange={(e) => handleChange(e, 'journeyStartDateTime')} /></td>
    <td><input type="date" value={editedData.journeyEndDateTime || trip.journeyEndDateTime} onChange={(e) => handleChange(e, 'journeyEndDateTime')} /></td>
    <td>
      <select value={editedData.isReturn || trip.isReturn} onChange={(e) => handleChange(e, 'isReturn')}>
        <option>Yes</option>
        <option>No</option>
      </select>
    </td>
    <td><input type="text" value={editedData.days || trip.days} onChange={(e) => handleChange(e, 'days')} /></td>
    <td><input type="text" value={editedData.package || trip.package} onChange={(e) => handleChange(e, 'package')} /></td>
    <td><input type="text" value={editedData.perKMRate || trip.perKMRate} onChange={(e) => handleChange(e, 'perKMRate')} /></td>
    <td><input type="text" value={editedData.extraKM || trip.extraKM} onChange={(e) => handleChange(e, 'extraKM')} /></td>
    <td>
      <select value={editedData.agentOrCustomer || trip.agentOrCustomer} onChange={(e) => handleChange(e, 'agentOrCustomer')}>
        <option>Agent</option>
        <option>Customer</option>
      </select>
    </td>
    <td><input type="text" value={editedData.advance || trip.advance} onChange={(e) => handleChange(e, 'advance')} /></td>
    <td><input type="text" value={editedData.cashCollection || trip.cashCollection} onChange={(e) => handleChange(e, 'cashCollection')} /></td>
    <td>
      <select value={editedData.mode || trip.mode} onChange={(e) => handleChange(e, 'mode')}>
        <option>Online</option>
        <option>Offline</option>
      </select>
    </td>
    <td><input type="text" value={editedData.split || trip.split} onChange={(e) => handleChange(e, 'split')} /></td>
    <td><input type="text" value={editedData.driverAllowance || trip.driverAllowance} onChange={(e) => handleChange(e, 'driverAllowance')} /></td>
    <td><input type="text" value={editedData.otherCollection || trip.otherCollection} onChange={(e) => handleChange(e, 'otherCollection')} /></td>
    <td><input type="text" value={editedData.toll || trip.toll} onChange={(e) => handleChange(e, 'toll')} /></td>
    <td>{formatDate(trip.createdDate)}</td>
    <td>{formatDate(trip.modifiedDate)}</td>
    <td>{trip.createdBy}</td>
    <td>{trip.modifiedBy}</td>
  </tr>
))}

          </tbody>
        </table>
      </div>
      {/* pagination btn */}
      {/* <Pagination className="justify-content-left">
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePagination(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}{" "}
      </Pagination> */}
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
                        onChange={handleNewTripChange}
                        className="form-control"
                        // required
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
                    <div className="form-group">
                      <label>Driver Name:</label>
                      <input
                        type="text"
                        name="driverName"
                        onChange={handleNewTripChange}
                        className="form-control"
                        // required
                      />
                    </div>
                    <div className="form-group">
                      <label>Driver Contact:</label>
                      <input
                        type="text"
                        name="driverContactNumber"
                        onChange={handleNewTripChange}
                        className="form-control"
                        // required
                      />
                    </div>
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
                    onClick={handleAddTrip}
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
