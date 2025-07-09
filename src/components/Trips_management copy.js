import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Trips_management.css";

const Trips_management = () => {
  const [trips, setTrips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);

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
    if (!newTrip.tripNumber || !newTrip.driverName || !newTrip.startDate) {
      alert("Please fill in all required fields.");
      return;
    }

    axios
      .post("http://localhost:5000/api/trips", newTrip, {
        headers: { "Content-Type": "application/json" },
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

  return (
    <>
      <h1>Trips Management</h1>
      <input
        type="text"
        placeholder="Search by any field..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <button className="btn" onClick={() => setIsModalOpen(true)}>
        Add Trip
      </button>
      <table className="trips-table">
        <thead>
          <tr>
            {/* Define all 34 columns */}
            <th>Sr No</th>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrips.map((trip, index) => (
            <tr key={trip._id}>
              <td>{index + 1}</td>
              <td>{trip.tripNumber}</td>
              <td>{trip.tripStatus}</td>
              <td>{trip.driverName}</td>
              <td>{trip.driverContactNumber}</td>
              <td>{trip.vehicleType}</td>
              <td>{trip.vehicleNumber}</td>
              <td>{trip.customerName}</td>
              <td>{trip.customerContactNumber}</td>
              <td>{trip.currentLocation}</td>
              <td>{trip.pickupLocation}</td>
              <td>{trip.dropLocation}</td>
              <td>{formatDate(trip.startDate)}</td>
              <td>{trip.startTime}</td>
              <td>{trip.startingVehicleImage}</td>
              <td>{trip.dropVehicleImage}</td>
              <td>{formatDate(trip.journeyStartDateTime)}</td>
              <td>{formatDate(trip.journeyEndDateTime)}</td>
              <td>{trip.isReturn}</td>
              <td>{trip.days}</td>
              <td>{trip.package}</td>
              <td>{trip.perKMRate}</td>
              <td>{trip.extraKM}</td>
              <td>{trip.agentOrCustomer}</td>
              <td>{trip.advance}</td>
              <td>{trip.cashCollection}</td>
              <td>{trip.mode}</td>
              <td>{trip.split}</td>
              <td>{trip.driverAllowance}</td>
              <td>{trip.otherCollection}</td>
              <td>{trip.toll}</td>
              <td>{formatDate(trip.createdDate)}</td>
              <td>{formatDate(trip.modifiedDate)}</td>
              <td>{trip.createdBy}</td>
              <td>{trip.modifiedBy}</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(trip._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Trip</h2>
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <label>
                  Trip Number:
                  <input
                    type="text"
                    name="tripNumber"
                    value={newTrip.tripNumber}
                    onChange={handleNewTripChange}
                    required
                  />
                </label>

                <label>
                  Trip Status:
                  <select
                    name="tripStatus"
                    value={newTrip.tripStatus}
                    onChange={handleNewTripChange}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Not Started">Not Started</option>
                  </select>
                </label>

                <label>
                  Driver Name:
                  <select
                    name="driverName"
                    value={newTrip.driverName}
                    onChange={handleNewTripChange}
                    required
                  >
                    <option value="">Select Driver</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.name}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Driver Contact Number:
                  <input
                    type="text"
                    name="driverContactNumber"
                    value={newTrip.driverContactNumber}
                    onChange={handleNewTripChange}
                    disabled // Disable this field as it is auto-filled
                    required
                  />
                </label>

                <label>
                  Vehicle Type:
                  <select
                    name="vehicleType"
                    value={newTrip.vehicleType}
                    onChange={handleNewTripChange}
                    required
                  >
                    <option value="">Select Vehicle Type</option>
                    <option value="Car">Car</option>
                    <option value="Bus">Bus</option>
                    <option value="Truck">Truck</option>
                    <option value="Bike">Bike</option>
                  </select>
                </label>

                <label>
                  Vehicle Number:
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={newTrip.vehicleNumber}
                    onChange={handleNewTripChange}
                    required
                  />
                </label>

                <label>
                  Customer Name:
                  <input
                    type="text"
                    name="customerName"
                    value={newTrip.customerName}
                    onChange={handleNewTripChange}
                    required
                  />
                </label>

                <label>
                  Customer Contact Number:
                  <input
                    type="text"
                    name="customerContactNumber"
                    value={newTrip.customerContactNumber}
                    onChange={handleNewTripChange}
                    required
                  />
                </label>

                <label>
                  Current Location:
                  <input
                    type="text"
                    name="currentLocation"
                    value={newTrip.currentLocation}
                    onChange={handleNewTripChange}
                    required
                  />
                </label>

                <label>
                  Pickup Location:
                  <input
                    type="text"
                    name="pickupLocation"
                    value={newTrip.pickupLocation}
                    onChange={handleNewTripChange}
                    required
                  />
                </label>

                <label>
                  Drop Location:
                  <input
                    type="text"
                    name="dropLocation"
                    value={newTrip.dropLocation}
                    onChange={handleNewTripChange}
                    required
                  />
                </label>

                <label>
                  Start Date:
                  <input
                    type="date"
                    name="startDate"
                    value={newTrip.startDate}
                    onChange={handleNewTripChange}
                    required
                  />
                </label>

                <label>
                  Start Time:
                  <input
                    type="time"
                    name="startTime"
                    value={newTrip.startTime}
                    onChange={handleNewTripChange}
                    required
                  />
                </label>

                <label>
                  Starting Vehicle Image:
                  <input
                    type="file"
                    name="startingVehicleImage"
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Drop Vehicle Image:
                  <input
                    type="file"
                    name="dropVehicleImage"
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Journey Start DateTime:
                  <input
                    type="datetime-local"
                    name="journeyStartDateTime"
                    value={newTrip.journeyStartDateTime}
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Journey End DateTime:
                  <input
                    type="datetime-local"
                    name="journeyEndDateTime"
                    value={newTrip.journeyEndDateTime}
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Is Return:
                  <select
                    name="isReturn"
                    value={newTrip.isReturn}
                    onChange={handleNewTripChange}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>

                <label>
                  Days:
                  <input
                    type="text"
                    name="days"
                    value={newTrip.days}
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Package:
                  <input
                    type="text"
                    name="package"
                    value={newTrip.package}
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Per KM Rate:
                  <input
                    type="text"
                    name="perKMRate"
                    value={newTrip.perKMRate}
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Extra KM:
                  <input
                    type="text"
                    name="extraKM"
                    value={newTrip.extraKM}
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Agent or Customer:
                  <select
                    name="agentOrCustomer"
                    value={newTrip.agentOrCustomer}
                    onChange={handleNewTripChange}
                  >
                    <option value="Agent">Agent</option>
                    <option value="Customer">Customer</option>
                  </select>
                </label>

                <label>
                  Advance:
                  <input
                    type="text"
                    name="advance"
                    value={newTrip.advance}
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Cash Collection:
                  <input
                    type="text"
                    name="cashCollection"
                    value={newTrip.cashCollection}
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Mode:
                  <select
                    name="mode"
                    value={newTrip.mode}
                    onChange={handleNewTripChange}
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </label>

                <label>
                  Split:
                  <input
                    type="text"
                    name="split"
                    value={newTrip.split}
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Driver Allowance:
                  <input
                    type="text"
                    name="driverAllowance"
                    value={newTrip.driverAllowance}
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Other Collection:
                  <input
                    type="text"
                    name="otherCollection"
                    value={newTrip.otherCollection}
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Toll:
                  <input
                    type="text"
                    name="toll"
                    value={newTrip.toll}
                    onChange={handleNewTripChange}
                  />
                </label>

                <label>
                  Created Date:
                  <input
                    type="text"
                    name="createdDate"
                    value={newTrip.createdDate}
                    disabled
                  />
                </label>

                <label>
                  Created By:
                  <input
                    type="text"
                    name="createdBy"
                    value={newTrip.createdBy}
                    onChange={handleNewTripChange}
                    disabled
                  />
                </label>

                <label>
                  Modified By:
                  <input
                    type="text"
                    name="modifiedBy"
                    value={newTrip.modifiedBy}
                    onChange={handleNewTripChange}
                  />
                </label>

                <button type="button" className="btn" onClick={handleAddTrip}>
                  Add Trip
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );



};

export default Trips_management;

  