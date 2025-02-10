// // import React, { useState, useEffect } from "react";
// // import "./Employee_master.css";

// // const Employee_master = () => {
// //   const [employees, setEmployees] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editingEmployee, setEditingEmployee] = useState(null);
// //   const [newEmployee, setNewEmployee] = useState({
// //     name: "",
// //     phone: "",
// //     license: "",
// //     dob: "",
// //     address: "",
// //     joiningDate: "",
// //     deposit: "",
// //     returnAmount: "NA",
// //     resignDate: "",
// //   });
// //   const [searchTerm, setSearchTerm] = useState("");


// //   // Fetch employees on mount
// //   useEffect(() => {
// //     fetch("http://localhost:5000/api/employees")
// //       .then((res) => {
// //         if (!res.ok) throw new Error(`Error: ${res.statusText}`);
// //         console.log('hi')
// //         return res.json();
// //       })
// //       .then((data) => setEmployees(data))
// //       .catch((err) => console.error("Error fetching employees: ok", err));
// //   }, []);

// //   const handleNewEmployeeChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewEmployee({ ...newEmployee, [name]: value });
// //   };


// // // Function to handle Add Employee
// //   const handleAddEmployee = () => {
// //     if (!newEmployee.name || !newEmployee.phone || !newEmployee.joiningDate) {
// //       alert("Please fill in all required fields.");
// //       return;
// //     }

// //     fetch("http://localhost:5000/api/employees", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(newEmployee),
// //     })
// //       .then((res) => {
// //         if (!res.ok) throw new Error(`Error: ${res.statusText}`);
// //         return res.json();
// //       })
// //       .then((addedEmployee) => {
// //         setEmployees([...employees, addedEmployee]);
// //         setNewEmployee({
// //           name: "",
// //           phone: "",
// //           license: "",
// //           dob: "",
// //           address: "",
// //           joiningDate: "",
// //           probationDate: "",
// //           deposit: "",
// //           returnAmount: "NA",
// //           resignDate: "",
// //         });
// //         setIsModalOpen(false);
// //       })
// //       .catch((err) => console.error("Error adding employee:", err));
// //   };


// //   // Function to handle delete
// //   const handleDelete = (id) => {
// //     const confirmDelete = window.confirm("Are you sure you want to delete this record?");
// //     if (!confirmDelete) return;
  
// //     fetch(`http://localhost:5000/api/employees/${id}`, {
// //       method: "DELETE",
// //     })
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Failed to delete");
// //         return res.json();
// //       })
// //       .then((data) => {
// //         alert(data.message); // Show success message
// //         setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== id)); // Use functional update
// //       })
// //       .catch((err) => console.error("Error deleting employee:", err));
// //   };

// //   // Function to Search employee
// //   const handleSearch = (e) => setSearchTerm(e.target.value);

// //   const filteredEmployees = employees.filter((emp) =>
// //     Object.values(emp).some((value) =>
// //       value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
// //     )
// //   );

// //   // date format for only yyyy-mm-dd
// //   const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : 'N/A';

// //   return (
// //     <>
// //       <h1>Employee Master</h1>
// //       <input
// //         type="text"
// //         placeholder="Search by any field..."
// //         value={searchTerm}
// //         onChange={handleSearch}
// //         className="search-input"
// //       />
// //       <button className="btn" onClick={() => setIsModalOpen(true)}>Add Employee</button>
// //       <table className="employee-table">
// //         <thead>
// //           <tr>
// //             <th>Sr No</th>
// //             <th>Driver Name</th>
// //             <th>Phone Number</th>
// //             <th>License Number</th>
// //             <th>DOB</th>
// //             <th>Address</th>
// //             <th>Joining Date</th>
// //             <th>Probation completion Date</th>
// //             <th>Deposit</th>
// //             <th>Return</th>
// //             <th>Resign Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredEmployees.map((emp, index) => (
// //             <tr key={emp._id}>
// //               <td>{index + 1}</td>
// //               <td>{emp.name}</td>
// //               <td>{emp.phone}</td>
// //               <td>{emp.license}</td>
// //               <td>{formatDate(emp.dob)}</td>
// //               <td>{emp.address}</td>
// //               <td>{formatDate(emp.joiningDate)}</td>
// //               <td>{formatDate(emp.completionDate)}</td>  {/*probation period/4 months completion*/}
// //               <td>{emp.deposit}</td>
// //               <td>{emp.returnAmount}</td>
// //               <td>{emp.resignDate}</td>
// //               <td>
// //                 <button className="btn btn-edit">Edit</button>
// //                 <button className="btn btn-delete" onClick={() => handleDelete(emp._id)}>Delete</button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {isModalOpen && (
// //         <div className="modal-overlay">
// //           <div className="modal">
// //             <div className="modal-header">
// //               <h2>Add New Employee</h2>
// //               <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
// //             </div>
// //             <div className="modal-body">
// //               <form>
// //                 <label>Name:
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     value={newEmployee.name}
// //                     onChange={handleNewEmployeeChange}
// //                     required
// //                   />
// //                 </label>
// //                 <label>Phone:
// //                   <input
// //                     type="text"
// //                     name="phone"
// //                     value={newEmployee.phone}
// //                     onChange={handleNewEmployeeChange}
// //                     required
// //                   />
// //                 </label>
// //                 <label>License Number:
// //                   <input
// //                     type="text"
// //                     name="license"
// //                     value={newEmployee.license}
// //                     onChange={handleNewEmployeeChange}
// //                   />
// //                 </label>
// //                 <label>DOB:
// //                   <input
// //                     type="date"
// //                     name="dob"
// //                     value={newEmployee.dob}
// //                     onChange={handleNewEmployeeChange}
// //                   />
// //                 </label>
// //                 <label>Address:
// //                   <input
// //                     type="text"
// //                     name="address"
// //                     value={newEmployee.address}
// //                     onChange={handleNewEmployeeChange}
// //                   />
// //                 </label>
// //                 <label>Joining Date:
// //                   <input
// //                     type="date"
// //                     name="joiningDate"
// //                     value={newEmployee.joiningDate}
// //                     onChange={handleNewEmployeeChange}
// //                     required
// //                   />
// //                 </label>
// //                 {/* <label>Probation Date:
// //                   <input
// //                     type="date"
// //                     name="probationDate"
// //                     value={newEmployee.joiningDate}
// //                     onChange={handleNewEmployeeChange}
// //                     required
// //                   />
// //                 </label> */}
// //                 <label>Deposit:
// //                   <input
// //                     type="number"
// //                     name="deposit"
// //                     value={newEmployee.deposit}
// //                     onChange={handleNewEmployeeChange}
// //                   />
// //                 </label>
// //                 <button type="button" className="btn" onClick={handleAddEmployee}>
// //                   Add Employee
// //                 </button>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default Employee_master;



// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import Pagination from "react-bootstrap/Pagination";
// import "./Employee_master.css";

// const Employee_master = () => {
//   const [employees, setEmployees] = useState([]); // Employee adding
//   const [searchTerm, setSearchTerm] = useState(""); // Search in the table
//   const [currentPage, setCurrentPage] = useState(1); // Pagination
//   const [isModalOpen, setIsModalOpen] = useState(false); // Open modal
//   const [editingEmployee, setEditingEmployee] = useState(null); // Edit employee
//   const [newEmployee, setNewEmployee] = useState({
//     name: "",
//     phone: "",
//     license: "",
//     dob: "",
//     address: "",
//     joiningDate: "",
//     deposit: "",
//     returnAmount: "NA",
//     resignDate: "",
//   });
//   const itemsPerPage = 5;

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/employees")
//       .then((res) => setEmployees(res.data))
//       .catch((err) => console.error("Error fetching employees: ", err));
//   }, []);

//   //  Function Add new employee
//   const handleNewEmployeeChange = (e) => {
//     const { name, value } = e.target;
//     setNewEmployee({ ...newEmployee, [name]: value });
//   };

//   const handleAddEmployee = () => {
//     if (!newEmployee.name || !newEmployee.phone || !newEmployee.joiningDate) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     axios
//       .post("http://localhost:5000/api/employees", newEmployee)
//       .then((res) => {
//         setEmployees([...employees, res.data]);
//         setNewEmployee({
//           name: "",
//           phone: "",
//           license: "",
//           dob: "",
//           address: "",
//           joiningDate: "",
//           deposit: "",
//           returnAmount: "NA",
//           resignDate: "",
//         });
//         setIsModalOpen(false);
//       })
//       .catch((err) => console.error("Error adding employee: ", err));
//   };

//   // Function to handle Edit button click
//   const handleEditEmployee = (employee) => {
//     setEditingEmployee({ ...employee }); // Make a copy to avoid direct mutation
//     setIsModalOpen(true); // Open the modal
//   };

//   // Function to handle employee update
//   const updateEmployee = () => {
//     if (editingEmployee) {
//       axios
//         .put(
//           `http://localhost:5000/api/employees/${editingEmployee._id}`,
//           editingEmployee
//         )
//         .then((res) => {
//           alert("Employee updated successfully!");
//           setEditingEmployee(null); // Clear editing state
//           setIsModalOpen(false); // Close modal

//           // Update the employee in the local state
//           setEmployees((prevEmployees) =>
//             prevEmployees.map((emp) =>
//               emp._id === editingEmployee._id ? res.data : emp
//             )
//           );
//         })
//         .catch((err) => {
//           console.error("Error updating employee:", err);
//           alert("Failed to update employee.");
//         });
//     }
//   };

//   // Function to handle input change in the modal
//   const handleEditingEmployeeChange = (e) => {
//     const { name, value } = e.target;
//     setEditingEmployee((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Function delete
//   const handleDelete = (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this record?"
//     );
//     if (!confirmDelete) return;

//     axios
//       .delete(`http://localhost:5000/api/employees/${id}`)
//       .then(() => {
//         setEmployees((prevEmployees) =>
//           prevEmployees.filter((emp) => emp._id !== id)
//         );
//       })
//       .catch((err) => console.error("Error deleting employee: ", err));
//   };

//   // Function Search
//   const handleSearch = (e) => setSearchTerm(e.target.value);

//   const filteredEmployees = employees.filter((emp) =>
//     Object.values(emp).some((value) =>
//       value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   // Format date
//   const formatDate = (date) =>
//     date ? new Date(date).toISOString().split("T")[0] : "N/A";

//   // Function Pagination
//   const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

//   const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
//   const displayedEmployees = filteredEmployees.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     // main container
//     <div className="container my-4">
//       <h1 className="text-center mb-4">Employee Master</h1>
//       {/* search and add employee btn */}
//       <div className="d-flex justify-content-between mb-3">
//         <input
//           type="text"
//           placeholder="Search by any field..."
//           value={searchTerm}
//           onChange={handleSearch}
//           className="form-control w-50"
//         />
//         <button
//           className="btn btn-primary"
//           onClick={() => setIsModalOpen(true)}
//         >
//           Add Employee
//         </button>
//       </div>

//       {/*employee table */}
//       <div className="table-responsive" style={{ maxHeight: "400px" }}>
//         <table className="table table-bordered table-hover table-striped">
//           <thead className="thead-dark">
//             <tr>
//               <th>#</th>
//               <th>Actions</th>
//               <th>Name</th>
//               <th>Phone</th>
//               <th>License</th>
//               <th>DOB</th>
//               <th>Address</th>
//               <th>Joining Date</th>
//               <th>Probation Completion Date</th>
//               <th>Deposit</th>
//               <th>Return Amount</th>
//               <th>Resign Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedEmployees.map((emp, index) => (
//               <tr key={emp._id}>
//                 <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                 <td>
//                   <button
//                     className="btn btn-warning btn-sm mx-1"
//                     onClick={() => handleEditEmployee(emp.id)}
//                   >
//                     Edit
//                   </button>
//                   <br />
//                   <button
//                     className="btn btn-danger btn-sm mx-1"
//                     onClick={() => handleDelete(emp._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//                 <td>{emp.name}</td>
//                 <td>{emp.phone}</td>
//                 <td>{emp.license}</td>
//                 <td>{formatDate(emp.dob)}</td>
//                 <td>{emp.address}</td>
//                 <td>{formatDate(emp.joiningDate)}</td>
//                 <td>{formatDate(emp.completionDate)}</td>
//                 <td>{emp.deposit}</td>
//                 <td>{emp.returnAmount}</td>
//                 <td>{formatDate(emp.resignDate)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* pagination btn */}
//       <Pagination className="justify-content-left">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <Pagination.Item
//             key={index}
//             active={index + 1 === currentPage}
//             onClick={() => handlePagination(index + 1)}
//           >
//             {index + 1}
//           </Pagination.Item>
//         ))}{" "}
//       </Pagination>

//       {/* Modal for add employee */}
//       {isModalOpen && (
//         <div
//           className="modal-overlay"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1050,
//           }}
//         >
//           <div
//             className="modal-dialog"
//             style={{
//               width: "500px",
//               maxHeight: "80%",
//               backgroundColor: "#fff",
//               borderRadius: "8px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <div
//               className="modal-content"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 height: "100%",
//               }}
//             >
//               <div className="modal-header" style={{ flexShrink: 0 }}>
//                 <h5 className="modal-title">Add New Employee</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   onClick={() => setIsModalOpen(false)}
//                   style={{
//                     background: "none",
//                     border: "none",
//                     fontSize: "1.5rem",
//                     cursor: "pointer",
//                   }}
//                 >
//                   &times;
//                 </button>
//               </div>
//               <div
//                 className="modal-body"
//                 style={{
//                   flex: 1,
//                   overflowY: "auto",
//                   padding: "1rem",
//                   maxHeight: "60vh", // limit height for scrolling content
//                   scrollbarWidth: "thin", // For Firefox
//                 }}
//               >
//                 <form>
//                   <div className="form-group">
//                     <label>Name:</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={newEmployee.name}
//                       onChange={handleNewEmployeeChange}
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Phone:</label>
//                     <input
//                       type="text"
//                       name="phone"
//                       value={newEmployee.phone}
//                       onChange={handleNewEmployeeChange}
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>License Number:</label>
//                     <input
//                       type="text"
//                       name="license"
//                       value={newEmployee.license}
//                       onChange={handleNewEmployeeChange}
//                       className="form-control"
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Date of Birth:</label>
//                     <input
//                       type="date"
//                       name="dob"
//                       value={newEmployee.dob}
//                       onChange={handleNewEmployeeChange}
//                       className="form-control"
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Address:</label>
//                     <input
//                       type="text"
//                       name="address"
//                       value={newEmployee.address}
//                       onChange={handleNewEmployeeChange}
//                       className="form-control"
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Joining Date:</label>
//                     <input
//                       type="date"
//                       name="joiningDate"
//                       value={newEmployee.joiningDate}
//                       onChange={handleNewEmployeeChange}
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Deposit:</label>
//                     <input
//                       type="number"
//                       name="deposit"
//                       value={newEmployee.deposit}
//                       onChange={handleNewEmployeeChange}
//                       className="form-control"
//                     />
//                   </div>
//                   <button
//                     type="button"
//                     className="btn btn-primary mt-3"
//                     onClick={handleAddEmployee}
//                   >
//                     Add Employee
//                   </button>
//                 </form>
//               </div>
//               <div className="modal-footer" style={{ flexShrink: 0 }}>
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Employee_master;
// // 



import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import "./Employee_master.css";

const Employee_master = () => {
  const [employees, setEmployees] = useState([]); // Employee adding
  const [searchTerm, setSearchTerm] = useState(""); // Search in the table
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const [isModalOpen, setIsModalOpen] = useState(false); // Open modal
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [editingEmployee, setEditingEmployee] = useState(null); // Edit employee
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    phone: "",
    license: "",
    dob: "",
    address: "",
    joiningDate: "",
    deposit: "",
    returnAmount: "NA",
    resignDate: "",
  });
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees: ", err));
  }, []);

  //  Function Add new employee
  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.phone || !newEmployee.joiningDate) {
      alert("Please fill in all required fields.");
      return;
    }
    axios
      .post("http://localhost:5000/api/employees", newEmployee)
      .then((res) => {
        setEmployees([...employees, res.data]);
        setNewEmployee({
          name: "",
          phone: "",
          license: "",
          dob: "",
          address: "",
          joiningDate: "",
          deposit: "",
          returnAmount: "NA",
          resignDate: "",
        }); // Reset new employee data
        setEditingEmployee(null); // Clear editing state
        setModalMode("add"); // Set mode to add
        setIsModalOpen(true); // Close the modal
        // setIsModalOpen(false);
      })
      .catch((err) => console.error("Error adding employee: ", err));
  };

  // Function to handle Edit button click
  const handleEditEmployee = (employee) => {
    console.log("Editing Employee:", employee);
    setModalMode("edit");
    setEditingEmployee(employee); // Make a copy to avoid direct mutation
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle employee update
  const updateEmployee = () => {
    if (editingEmployee) {
      axios
        .put(
          `http://localhost:5000/api/employees/${editingEmployee._id}`,
          editingEmployee
        )
        .then((res) => {
          alert("Employee updated successfully!");
          setEditingEmployee(null); // Clear editing state
          setIsModalOpen(false); // Close modal

          // Update the employee in the local state
          const updatedEmployees = employees.map((emp) =>
            emp._id === editingEmployee._id ? res.data : emp
          );
          setEmployees(updatedEmployees);
          setEditingEmployee(null);
          setModalMode("add"); // Reset mode to add
          setIsModalOpen(false); // Close modal
        })
        .catch((err) => {
          console.error("Error updating employee:", err);
          alert("Failed to update employee.");
        });
    }
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
          {/* {modalMode === "add" ? "Add New Employee": "Edit Employee"}
                  {console.log(modalMode)} */}
          Add New Employee
        </button>
      </div>

      {/*employee table */}
      <div className="table-responsive" style={{ maxHeight: "400px" }}>
        <table className="table table-bordered table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th>Name</th>
              <th>Phone</th>
              <th>License</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Joining Date</th>
              <th>Probation Completion Date</th>
              <th>Deposit</th>
              <th>Return Amount</th>
              <th>Resign Date</th>
            </tr>
          </thead>
          <tbody>
            {displayedEmployees.map((emp, index) => (
              <tr key={emp._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mx-1"
                    onClick={() => handleEditEmployee(emp)}
                  >
                    Edit
                  </button>
                  <br />
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>{emp.name}</td>
                <td>{emp.phone}</td>
                <td>{emp.license}</td>
                <td>{formatDate(emp.dob)}</td>
                <td>{emp.address}</td>
                <td>{formatDate(emp.joiningDate)}</td>
                <td>{formatDate(emp.completionDate)}</td>
                <td>{emp.deposit}</td>
                <td>{emp.returnAmount}</td>
                <td>{formatDate(emp.resignDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination btn */}
      <Pagination className="justify-content-left">
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePagination(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}{" "}
      </Pagination>

      {/* Modal for add employee */}
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
                  {console.log(modalMode)}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => {
                    console.log("Closing modal and resetting states.");
                    setIsModalOpen(false);
                    setEditingEmployee(null);
                    setModalMode("add");
                    setNewEmployee({
                      name: "",
                      phone: "",
                      license: "",
                      dob: "",
                      address: "",
                      joiningDate: "",
                      deposit: "",
                      returnAmount: "NA",
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
                  maxHeight: "60vh", // limit height for scrolling content
                  scrollbarWidth: "thin", // For Firefox
                }}
              >
                <form>
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={
                        editingEmployee
                          ? editingEmployee.name
                          : newEmployee.name
                      }
                      onChange={(e) =>
                        editingEmployee
                          ? setEditingEmployee({
                              ...editingEmployee,
                              name: e.target.value,
                            })
                          : handleNewEmployeeChange(e)
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
                        editingEmployee
                          ? editingEmployee.phone
                          : newEmployee.phone
                      }
                      onChange={(e) =>
                        editingEmployee
                          ? setEditingEmployee({
                              ...editingEmployee,
                              phone: e.target.value,
                            })
                          : handleNewEmployeeChange(e)
                      }
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>License Number:</label>
                    <input
                      type="text"
                      name="license"
                      value={newEmployee.license}
                      onChange={handleNewEmployeeChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                      type="date"
                      name="dob"
                      value={newEmployee.dob}
                      onChange={handleNewEmployeeChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={newEmployee.address}
                      onChange={handleNewEmployeeChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Joining Date:</label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={newEmployee.joiningDate}
                      onChange={handleNewEmployeeChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Deposit:</label>
                    <input
                      type="number"
                      name="deposit"
                      value={newEmployee.deposit}
                      onChange={handleNewEmployeeChange}
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
                    console.log("Closing modal and resetting states.");
                    setIsModalOpen(false);
                    setModalMode("add");
                    setEditingEmployee(null);
                    setNewEmployee({
                      name: "",
                      phone: "",
                      license: "",
                      dob: "",
                      address: "",
                      joiningDate: "",
                      deposit: "",
                      returnAmount: "NA",
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
