/* eslint-disable jsx-a11y/alt-text */
import "material-symbols";
import { useState, useEffect } from "react";
import { showToast } from "./toast";
import EmptyProfile from "./student_empty";
import Search from "./search";
import UserTile from "./user_list_tile";

// Modal component
function Modal({ id, title, children }) {
  return (
    <>
      <button onClick={() => (document.getElementById(id).checked = true)} className="text-secondary font-bold">
        <span class="material-symbols-outlined align-middle" style={{ fontSize: '15px' }}>edit</span> {title}
      </button>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="pt-6">
            <h3 className="font-bold text-primary text-3xl mx-8 mb-6">{title}</h3>
            {children}
            <div className="modal-action">
              <label onClick={() => (document.getElementById(id).checked = false)} className="btn-ghost btn">Cancel</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function StudentProfile(props) {
  const { onApproved, data, advisers, officers } = props;
  const [assignedOfficer, setAssignedOfficer] = useState(data.assignedOfficer);
  const [assignedAdviser, setAssignedAdviser] = useState(data.assignedAdviser);

  function approveApplication(event) {
    event.preventDefault();

    // Construct the object based on form
    let dta = {};
    dta.id = data._id;

    fetch("http://localhost:3001/api/accounts/approve",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dta)
      })
      .then(response => response.json())
      .then(body => {
        console.log(body);
        if (body.success) {
          showToast("Approval success", "Account approved successfully.", "success", "left");
          onApproved();
        } else {
          showToast("Approval error", "An error has occured. Try again later.", "error", "left");
        }
      })
  }

  useEffect(() => {
    setAssignedOfficer(data.assignedOfficer);
    setAssignedAdviser(data.assignedAdviser);
  }, [data]);


  if (data == null || data === undefined || data.length === 0) {
    return <EmptyProfile />;
  }

  function assignAdviser(adviser) {
    // Construct the object based on form
    let dta = {};
    dta.id = data._id;
    dta.assignId = adviser._id;

    fetch("http://localhost:3001/api/accounts/assign?type=adviser",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dta)
      })
      .then(response => response.json())
      .then(body => {
        console.log(body);
        if (body.success) {
          setAssignedAdviser(adviser)
          document.getElementById('assign-adviser-modal').checked = false;
          showToast("Assigned successfully", "Adviser assigned successfully.", "success", "left");
        } else {
          showToast("Assignment error", "An error has occured. Try again later.", "error", "left");
        }
      })
  }

  function assignOfficer(officer) {
    // Construct the object based on form
    let dta = {};
    dta.id = data._id;
    dta.assignId = officer._id;

    fetch("http://localhost:3001/api/accounts/assign?type=officer",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dta)
      })
      .then(response => response.json())
      .then(body => {
        console.log(body);
        if (body.success) {
          setAssignedOfficer(officer)
          document.getElementById('assign-officer-modal').checked = false;
          showToast("Assigned successfully", "Clearance officer assigned successfully.", "success", "left");
        } else {
          showToast("Assignment error", "An error has occured. Try again later.", "error", "left");
        }
      })
  }

  function assignedOfficerModal(title) {
    return (
      <Modal id="assign-officer-modal" title={title}>
        <Search type="A" />
        <div className="overflow-auto h-48 text-base-content">
          {officers.map((acc) => {
            return (
              <UserTile onAccountClick={(e) => assignOfficer(acc)} dialog={true} data={acc} />
            )
          })}
        </div>
      </Modal>
    )
  }
  
  function assignedAdviserModal(title) {
    return (
      <Modal id="assign-adviser-modal" title={title}>
        <Search type="A" />
        <div className="overflow-auto h-48 text-base-content">
          {advisers.map((acc) => {
            return (
              <UserTile onAccountClick={(e) => assignAdviser(acc)} dialog={true} data={acc} />
            )
          })}
        </div>
      </Modal>
    )
  }

  return (
    <div className="text-[#6b7280] flex flex-col items-center justify-center h-screen" style={{ height: "90vh" }}>
      <div className="">
        <div className="w-28 avatar pt-2 mb-4">
          <img
            className="rounded-full"
            src={"../assets/images/profile-default.webp"}
          />
        </div>
      </div>
      <span className="font-semibold text-primary text-3xl mb-1">{data.firstName} {data.middleName} {data.lastName}</span>
      <span className="text-sm mb-4">{data.course} ({data.college})</span>
      <span className="text-lg font-semibold text-base-content">{data.studentNumber}</span>
      <span className="font-semibold text-base mb-10">{data.email}</span>

      {data.userType === null ?
        <button onClick={approveApplication} className="btn btn-primary font-bold">
          <span class="material-symbols-outlined align-middle mr-2">check</span>
          Approve account
        </button>
        :

        <div className="flex flex-row mt-14">
          <div className="flex-1 w-96 h-36">
            <h2 className={" font-semibold text-black text-2xl"}>
              Assigned Adviser
            </h2>
            <div className="flex flex-row">
              <div className="m-auto flex-none">
                <div className="w-10 avatar pt-2">
                  <img className="rounded-full" src={"../assets/images/profile-default.webp"} />
                </div>
              </div>
              <div className="flex flex-col justify-center flex-auto h-24 ml-6">
                {assignedAdviser === undefined || assignedAdviser === null ?
                  <div>
                    {assignedAdviserModal("Assign adviser")}
                  </div>
                  :
                  <div>
                    <h3 className="text-base-content font-bold">{assignedAdviser.firstName} {assignedAdviser.lastName}</h3>
                    <p className="text-sm" style={{ marginTop: "-0.2rem" }}>
                      {assignedAdviser.email}
                    </p>
                    {assignedAdviserModal("Re-assign adviser")}
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="flex-1 w-96 h-36">
            <h2 className={" font-semibold text-black text-2xl"}>
              Assigned Clearance Officer
            </h2>
            <div className="flex flex-row">
              <div className="m-auto flex-none">
                <div className="w-10 avatar pt-2">
                  <img className="rounded-full" src={"../assets/images/profile-default.webp"} />
                </div>
              </div>
              <div className="flex flex-col justify-center flex-auto h-24 ml-6">
                {assignedOfficer === undefined || assignedOfficer === null ?
                  <div>
                    {assignedOfficerModal("Assign officer")}
                  </div>
                  :
                  <div>
                    <h3 className="text-base-content font-bold">{assignedOfficer.firstName} {assignedOfficer.lastName}</h3>
                    <p className="text-sm" style={{ marginTop: "-0.2rem" }}>
                      {assignedOfficer.email}
                    </p>
                    {assignedOfficerModal("Re-assign officer")}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
