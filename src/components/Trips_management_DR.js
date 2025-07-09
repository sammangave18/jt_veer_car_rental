// import { useState, useEffect } from "react";
// import axios from "axios";

// const TripsManagement = () => {
//   const [trips, setTrips] = useState([]);
//   const [employee, setEmployee] = useState(null);
//   const loggedInEmployeeId = localStorage.getItem("employeeNumber"); // Get Employee ID

//   useEffect(() => {
//     if (!loggedInEmployeeId) {
//       console.log("❌ No employee ID found, skipping API call.");
//       return;
//     }

//     console.log("🔵 Fetching employee data for:", loggedInEmployeeId);

//     axios
//       .get(`http://localhost:5000/api/employees/search/${loggedInEmployeeId}`)
//       .then((res) => {
//         if (res.data.length > 0) {
//           console.log("✅ Employee Data Fetched:", res.data[0]);
//           setEmployee(res.data[0]); // 🔥 FIX: Extract the first employee object
//         } else {
//           console.error("❌ No employee data found");
//         }
//       })
//       .catch((err) => {
//         console.error("❌ Error fetching employee details:", err);
//       });
//   }, [loggedInEmployeeId]);

//  useEffect(() => {
//     if (!employee || !employee.employeeNumber) {
//         console.log("❌ Employee data not available, skipping trips fetch.");
//         return;
//     }

//     console.log("🔵 Fetching trips for employee:", employee.name);

//     axios
//         .get(`http://localhost:5000/api/trips/${employee.employeeNumber}`)
//         .then((res) => {
//             console.log("🟢 Trips Data Fetched:", res.data);
//             setTrips(res.data);
//         })
//         .catch((err) => {
//             console.error("❌ Error fetching trips:", err.response ? err.response.data : err.message);
//         });
// }, [employee]);


//   return (
//     <div>
//       <h2>Trips Management</h2>
//       <h2>Trips</h2>
//       {trips.length === 0 ? <p>No trips found.</p> : (
//         <ul>
//           {trips.map((trip) => (
//             <li key={trip._id}>{trip.tripNumber} - {trip.driverName}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TripsManagement;

import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const TripsTable = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/trips");
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Trips List</h2>
      <div className="table-responsive" style={{ maxHeight: "400px" }}>
        <Table bordered hover striped>
          <thead className="thead-dark">
            <tr>
              <th>#</th>
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
              {/* <th>Start Date</th>
              <th>Start Time</th>
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
              <th>Created By</th> */}
              <th>Modified By</th>
            </tr>
          </thead>
          <tbody>
            {trips.length > 0 ? (
              trips.map((trip, index) => (
                <tr key={trip._id}>
                  <td>{index + 1}</td>
                  {Object.keys(trip).map((field, i) =>
                    field !== "_id" && field !== "__v" ? (
                      <td key={i}>{field.includes("Date") ? new Date(trip[field]).toLocaleString() : trip[field]}</td>
                    ) : null
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="34" className="text-center">No trips found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TripsTable;
