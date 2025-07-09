// import React from 'react'
// import "./FAQ.css"
// function FAQ() {
//   return (
//     <div>
//       <h2>Hello</h2>
//       <p>We will solve your query!!!</p>
//     </div>
//   )
// }

// export default FAQ

import React, { useState } from "react";
import "./FAQ.css";

function FAQ() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsModalOpen(true)}
      >
        Launch demo modal
      </button>

      {isModalOpen && (
        <div
          className="modal fade show"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Add New Employee
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <label>
                    Name:
                    <input type="text" name="name" required />
                  </label>
                  <label>
                    Phone:
                    <input type="text" name="phone" required />
                  </label>
                  <label>
                    License Number:
                    <input type="text" name="license" />
                  </label>
                  <label>
                    DOB:
                    <input type="date" name="dob" />
                  </label>
                  <label>
                    Address:
                    <input type="text" name="address" />
                  </label>
                  <label>
                    Joining Date:
                    <input type="date" name="joiningDate" required />
                  </label>
                  <label>
                    Deposit:
                    <input type="number" name="deposit" />
                  </label>
                  <button type="button" className="btn btn-primary">
                    Add Employee
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FAQ;
